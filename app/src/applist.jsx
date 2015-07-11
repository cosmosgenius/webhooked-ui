'use strict';

let SiteHeader = React.createClass({
    render: function() {
        return (
            <header role="banner" className="fill-primary pad-1">
                <h2 className="normal nospace push-h">Webhooked</h2>
            </header>
        );
    }
});

let PageHeader = React.createClass({
    render: function() {
        return (
            <section className="page-header pad-1">
                <h1 className="thin">Apps</h1>
            </section>
        );
    }
});

let AppRow = React.createClass({
    render: function() {
        let tasks = this.props.app.tasks
                        .map((task) => {
                            return <li><code>{task}</code></li>;
                        });

        return (
            <div className="card-wrapper pad-h push-1-bottom">
                <a className="card fill-white pad-1 push-1" href="#">
                    <h3 className="dark">{this.props.app.name}</h3>
                    <h5 className="dark">{this.props.app.path}</h5>
                    <div className="mediumgray"><ol>{tasks}</ol></div>
                    <date className="lightgray"> {(new Date(this.props.app.modified_at)).toDateString()}  {(new Date(this.props.app.created_at)).toDateString()}</date>
                </a>
            </div>
        );
    }
});

let AppTable = React.createClass({
    render: function() {
        let rows = this.props.apps
                        .map((app) => {
                            return <AppRow app={app} key={app.name} />;
                        });
        return (
            <div className="grid pad-1">{rows}</div>
        );
    }
});

let AppList = React.createClass({

    render: function() {
        return (
            <div>
                <SiteHeader />
                <PageHeader />
                <AppTable apps={this.props.apps} />
            </div>
        );
    }

});

module.exports = AppList;
