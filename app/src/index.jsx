var Hello = require('./hello.jsx');
var AppList = require('./applist.jsx');


$.ajax('/data.json')
    .then(function(data) {
        React.render(
            <div>
                <Hello></Hello>
                <AppList apps={data}></AppList>
            </div>,
            document.getElementById("appview")
        );
    });
