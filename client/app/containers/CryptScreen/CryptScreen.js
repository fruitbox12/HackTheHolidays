import React, {Component} from 'react';
import Cryptinfo from '../../components/Profile/CryptInfo'

class CryptScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            error: null,
            results: [],
        };

        //Bind to container
        this.fetchProfileStockInfo = this.fetchProfileStockInfo.bind(this);
    }
    componentWillMount(){
        this.fetchProfileStockInfo();
    }

    fetchProfileCryptInfo(){
        fetch('/api/stock/portfolio', { method: 'POST' })
            .then(res => res.json())
            .then(json => {
                //Successful fetch
                if(json.success){
                    this.setState({
                        isLoading: false,
                        results: json.results,
                    });
                } 
                
                //Failed fetch
                else {
                    this.setState({
                        isLoading: false,
                        error: json.message,
                    });
                }
        });  
    }

    render() {
        const {
            error,
            isLoading,
            results,
        } = this.state;
        
        //LOADING
        if(isLoading){
            return(
                <div>
                    <p>Loading...</p>
                </div>
            );
        }

        //ERROR
        if(error) {
            return (
                <div style={{backgroundColor: '#610B21'}}>
                    <p style={{color: '#fff'}}>
                        {error}
                    </p>
                </div>
                
            )
        }

        return(
            <div>
                <p>CryptScreen</p>
                {
                    results.map(result => <StockInfo data={result}/>)
                }
            </div>
        )
    };
}

export default CryptScreen;