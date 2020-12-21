


render() {
    return (
        <div style={{ display: 'flex', alignItems: 'flex-start',  flexDirection: 'column', padding: '20px' }}>
                        
                        <h3 style={{}}>1. Owner/Broker Contact Info</h3>
                        <div style={{ display: 'flex', alignItems: 'flex-start', flexDirection: 'column', marginLeft: '24px', marginTop: '10px' }}>
                            <form>
                                <strong>Is the property for sale?</strong>
                                <div className="inputGroup">
                                    <label>yes<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                                    <label>no<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                                </div>

                                <strong>Is the property for lease?</strong>
                                <div className="inputGroup">
                                    <label>yes<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                                    <label>no<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                                </div>

                                <strong>What is your relationship to this property?</strong>
                                <div className="inputGroup">
                                    <label>I am the broker<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                                    <label>I am the landlord<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                                    <label>other<input type="checkbox" value={this.state.value} onChange={this.handleChange} /></label>
                                </div>

                                <strong>Additional info</strong>
                                <div className="inputGroup">
                                    <textarea maxLength="240" style={{ marginLeft: '0em', width: '75vh', height: '100px', padding: '0.25em', fontSize: '14px'}}
                                     type="text" 
                                     
                                     multiline
                                    placeholder="Enter any additional contact information that is relevant to this listing"
                                    value={this.state.value} onChange={this.handleChange} />
                                </div>
                                <p style={{ fontSize: '12px'}}>240 characters max</p>
   
                                <div class="form-group files color">
                                    <input type="file" className="form-control" multiple=""/>
                                </div>
                            </form>
                        </div>
                    </div>
    )
}