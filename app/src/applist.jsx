'use strict';

let PageHeader = React.createClass({
    render: function() {
        return (
            <h1>Apps</h1>
        );
    }
});

let AppRow = React.createClass({
    render: function() {
        let tasks = this.props.app.tasks
                        .reduce((red,task) => {
                            red.push(<li>{task}</li>);
                            return red;
                        },[]);

        return (
            <a href="#">
                <div className="card">
                    <h3>{this.props.app.name}</h3>
                    <h5>{this.props.app.path}</h5>
                    <div><ul>{tasks}</ul></div>
                    <div>{(new Date(this.props.app.modified_at)).toDateString()}</div>
                    <div>{(new Date(this.props.app.created_at)).toDateString()}</div>
                </div>
            </a>
        );
    }
});

let AppTable = React.createClass({
    render: function() {
        let rows = this.props.apps
                        .reduce((red,app) => {
                            red.push(<AppRow app={app} key={app.name} />);
                            return red;
                        }, []);
        return (
            <div className="grid">{rows}</div>
        );
    }
});

let AppList = React.createClass({

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
