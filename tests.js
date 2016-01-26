'use strict';

class TestEnvironment {

    constructor(section) {
        document.getElementById(section).innerHTML = `
<table id="tests" class="test">
    <tr>
        <th style="min-width: 100px;">Test</th>
        <th>Expected value</th>
        <th>Actual value</th>
        <th>Result</th>
    </tr>
</table>
`;
    }

    test(desc, tests) {

        let fmt = function(s, v) {
            if(v) {
                return 'exception';
            } else if(s === null || s === undefined) {
                return '';
            } else if(typeof s === 'number') {
                return '0x' + s.toString(16).toUpperCase();
            } else if(typeof s === 'object') {
                return '[' + s.map(v => fmt(v)).join(', ') + ']';
            } else {
                return s;
            }
        }

        let s = ['<tr><td rowspan="' + tests.length + '">' + desc + '</td>'];

        let fst = true;
        tests.forEach(t => {
            if(!fst) { s.push('<tr>'); }
            
            let test_function = t[0], validation = t[1], expected = t[2], data = t[3];
            let r = this._run_test(test_function, validation, expected, data);
            let ok = r[0], result = r[1], exception = r[2];

            //  add to table
            s.push('<td style="text-align: center;">' + fmt(expected, (validation == 'exception')) + '</td>');
            s.push('<td style="text-align: center;">' + fmt(result, exception) + '</td>');
            if(ok) {
                s.push('<td class="ok"></td>');
            } else {
                s.push('<td class="nok"></td>');
            }

            s.push('</tr>');
            fst = false;
        });

        document.getElementById('tests').innerHTML += s.join('');
    }


    //
    // PRIVATE METHODS
    //

    _run_test(test_function, validation, expected, data) {
        // run test
        let result;
        let exception = false;
        try {
            result = test_function(data);  // run test
        } catch(e) {
            result = e;
            exception = true;
        }

        // verify assertion
        let ok = true;
        if(validation === '=') {
            if(typeof expected === 'object') {
                if(typeof result != 'object') {
                    ok = false;
                } else if(result.length != expected.length) {
                    ok = false;
                } else {
                    for(let i=0; i<result.length; ++i) {
                        if(expected[i] != result[i]) {
                            ok = false;
                            break;
                        }
                    }
                }
            } else {
                ok = (result === expected);
            }
        } else if(validation == 'exception') {
            ok = exception;
            if(expected && (result != expected)) {
                ok = false;
            }
        } else if(validation == '!exception') {
            ok = !exception;
        } else {
            throw 'Invalid validation type "' + validation + "'";
        }
        return [ ok, result, exception ]
    }

}


// vim: ts=4:sw=4:sts=4:expandtab
