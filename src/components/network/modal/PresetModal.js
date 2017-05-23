import React from 'react';

export default class PresetModal extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            name: null
        }
    }

    _handleNameInput(e) {
        this.setState({
            name: e.target.value
        })
    }

    _handleCancel() {
        this.props.closeModal()
    }

    _handleSave(e) {
        e.preventDefault();
        const {saveCallback, cpu, ram, disk} = this.props
        const {name} = this.state
        saveCallback({
            name,
            cpu_cores: cpu,
            memory: ram,
            disk
        })
        this.props.closeModal()
    }

    render() {
        const {cpu, ram, disk} = this.props
        return (
            <div className="container__modal network-preset-modal ">
                <form className="content__modal" onSubmit={::this._handleSave}>
                    <section className="section__naming">
                        <h4>Name your Preset</h4>
                        <input type="text" onChange={::this._handleNameInput} required/>
                    </section>
                    <section className="section__info">
                        <div>
                            <h5>CPU</h5>
                            <span>{cpu > 1 ? `${cpu} Cores` : `${cpu} Core`}</span>
                        </div>
                        <div>
                            <h5>RAM</h5>
                            <span>{ram} GB</span>
                        </div>
                        <div>
                            <h5>Disk</h5>
                            <span>{disk} GB</span>
                        </div>
                    </section>
                    <div className="action__modal">
                        <span className="btn--cancel" onClick={::this._handleCancel}>Cancel</span>
                        <button type="submit" className="btn--primary">Save</button>
                    </div>
                </form>
            </div>
        );
    }
}
