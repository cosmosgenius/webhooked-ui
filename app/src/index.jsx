var AppList = require('./applist.jsx');

$.ajax('/data.json')
    .then(function(data) {
        React.render(
            <div>
                <AppList apps={data}></AppList>
            </div>,
            document.getElementById("appview")
        );
    });
