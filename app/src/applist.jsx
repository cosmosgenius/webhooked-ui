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
        return (
            <tr>
                <td>{this.props.app.name}</td>
                <td>{this.props.app.path}</td>
                <td>{this.props.app.modified_at}</td>
                <td>{this.props.app.created_at}</td>
                <td>{this.props.app.tasks}</td>
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
