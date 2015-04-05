'use strict';

var PageHeader = React.createClass({
    render: function() {
        return (
            <h1>Apps</h1>
        );
    }
});

var AppRow = React.createClass({
    render: function() {
        let tasks = this.props.app.tasks
                        .reduce(function(red,task){
                            red.push(<li>{task}</li>);
                            return red
                        },[]);

        return (
            <tr>
                <td>{this.props.app.name}</td>
                <td>{this.props.app.path}</td>
                <td>{(new Date(this.props.app.modified_at)).toDateString()}</td>
                <td>{(new Date(this.props.app.created_at)).toDateString()}</td>
                <td><ul>{tasks}</ul></td>
            </tr>
        );
    }
});

var AppTable = React.createClass({
    render: function() {
        var rows = [];
        this.props.apps.forEach(function(app) {
            rows.push(<AppRow app={app} key={app.name} />);
        });
        return (
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Path</th>
                        <th>Modified at</th>
                        <th>Created at</th>
                        <th>Tasks</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

var AppList = React.createClass({

    render: function() {
        return (
            <div>
                <PageHeader />
                <AppTable apps={this.props.apps} />
            </div>
        );
    }

});

module.exports = AppList;
