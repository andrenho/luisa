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

        let fmt = function(s) {
            if(typeof s === 'number') {
                return '0x' + s.toString(16);
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

            // run test
            let result;
            try {
                result = test_function(data);  // run test
            } catch(e) {
                result = e;
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
            } else {
                throw 'Invalid validation type';
            }

            //  add to table
            s.push('<td style="text-align: center;">' + fmt(expected) + '</td>');
            s.push('<td style="text-align: center;">' + fmt(result) + '</td>');
            if(ok) {
                s.push('<td style="text-align: center;"><img src="img/ok.png" alt="ok"></td>');
            } else {
                s.push('<td style="text-align: center;"><img src="img/failed.png" alt="failed"></td>');
            }

            s.push('</tr>');
            fst = false;
        });

        document.getElementById('tests').innerHTML += s.join('');
    }

}


// vim: ts=4:sw=4:sts=4:expandtab
