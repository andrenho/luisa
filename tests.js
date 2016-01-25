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
        let s = ['<tr><td rowspan="' + tests.length + '">' + desc + '</td>'];

        let fst = true;
        tests.forEach(t => {
            if(!fst) { s.push('<tr>'); }
            
            let test_function = t[0], validation = t[1], expected = t[2], data = t[3];
            s.push('<td style="text-align: center;">' + expected + '</td>');
            let result = test_function(data);  // run test
            s.push('<td style="text-align: center;">' + result + '</td>');
            if(expected === result) {
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
