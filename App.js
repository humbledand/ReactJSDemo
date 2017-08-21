import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'fixed-data-table/dist/fixed-data-table.min.css';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      myData: [
        {brightness: '800', onoff: 1, color: 'red', id: 2, watt:10, hours:3},
        {brightness: '600', onoff: 1, color: 'blue',id: 3, watt:10, hours:3},
        {brightness: '1000', onoff: 1, color: 'green',id: 4, watt:60, hours:4},
        {brightness: '450', onoff: 1, color: 'pink', id: 5, watt:100, hours:1},
        {brightness: '600', onoff:1, color: 'yellow',id: 6, watt:10, hours:3},
      ],
      onoff: true,
    };

    this.handleAllOnOffChange = this.handleAllOnOffChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.addBulb = this.addBulb.bind(this);
  }

  handleAllOnOffChange(){
     let myArray = this.state.myData; 
     // myArray.map(  (item) => {{item.brightness}: '5'} ); 

     //myArray[2].onoff = 0;
     myArray.forEach( (item) => item.onoff = (item.onoff == 1? 0:1) );
     //myArray.map( (item) =>  {'brightness':{item.brightness}, 'onoff':!{item.onoff} , 'color':{item.color}, 'id':{item.id} } );
     //let tempObj = myArray.map( (item) => {'brightness':{item.brightness}, 'onoff':({item.onoff} == 1)? 0: 1, 'color':{item.color} }); 
     this.setState ({myData: myArray});

  }

  handleClick(id){
    let myArr = this.state.myData;

    let myResult = myArr.filter( item => item.id != id)

    this.setState({myData: myResult});
  }

  addBulb(a, b, c, d){
    // default value:
    a = (a !== '') ?  a : 'LED';
    b = (b !== '') ?  b : 'natural';
    c = (c !== '') ?  c : 10;
    d = (d !== '') ?  d : 2;

    let tempObj = {brightness: a, onoff:1, color: b,id: Date.now(), watt: c, hours: d};
    let myArr = this.state.myData;
    myArr.push(tempObj);

    this.setState({myData: myArr});
  }

  render() {

    return ( <div>

        <p> 
          <MainSwitch data1={this.state.myData} handleAllOnOffChange={this.handleAllOnOffChange} addBulb={this.addBulb} />
        </p>
        <p>
          <Bulbs data1 = {this.state.myData} handleClick = {this.handleClick}/>
        </p>

        <p>
          <PowerCost allData={this.state.myData}/>
        </p>

      </div>);
  }
}


 


class MainSwitch extends React.Component{
  constructor(props){
    super(props);

    this.state = {
        showHide: false,
    };

    this.handleOnOff = this.handleOnOff.bind(this);

    this.showForm = this.showForm.bind(this);
    this.addBulb = this.addBulb.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleOnOff(){
      /// this.setState( (this.state.myData.item) => item.onoff: '0' );
      this.props.handleAllOnOffChange() ; 
     //this.setState({myData: myArray})
  }

  showForm(){
    this.setState({showHide: true});
  }
  addBulb(){
    this.props.addBulb(this.input1.value, this.input2.value, this.input3.value, this.input4.value);
  }
  handleCancel(){
    this.setState({showHide: false});

  }

  render(){
    var divInputStyle={width: '50%', background:'#eff8ff', padding:1};

    if (this.state.showHide) {

    return (<div>hi MainSwitch 
        <br></br>
        {/* <Bulb brightness='5' onoff='1' color='red'/> */}

        <button  onClick={this.handleOnOff} >turn on</button>
        <button onClick = {this.showForm} >add more</button>
        <p></p>


        <div id='divInput' style={divInputStyle}>
        <p>
          <input type='text'  id='brightness' placeholder='bulb or appliance' ref={(input) => this.input1 = input} />
          <input type='text'  id='color' placeholder='color' ref={(input) => this.input2 = input} />
          <input type='text'  id='watt' placeholder='input wattage, e.g, 10' ref={(input) => this.input3 = input} />
          <input type='text'  id='hours' placeholder='input hours per day, e.g, 5' ref={(input) => this.input4 = input} />
        </p>
        <p>
          <button  onClick={this.handleCancel} >cancel</button> 
          <button onClick = {this.addBulb} >add bulb</button>
        </p>
        </div>


      </div>);
  }
  else {
    return (<div>hi MainSwitch 
        <br></br>
        {/* <Bulb brightness='5' onoff='1' color='red'/> */}

        <button  onClick={this.handleOnOff} >turn on</button>
        <button onClick = {this.showForm} >add more</button>
        <p></p>

      </div>);
  }
  }


}

class Bulb extends React.Component{
  constructor(props){
    super(props);

    this.clickHandler = this.clickHandler.bind(this);
  }

  clickHandler(e){
    // alert(e.target.id);
    this.props.handleClick(e.target.id);
  }

  render(){
     var style1 = {color: 'red'};

    return (
        /* <div>hi Bulb<br></br> 
        on/off is: {this.props.onoff} <br></br> 
        brightness is: {this.props.brightness} <br></br>
        </div>
        */

    <tr>
      <td>{this.props.brightness}</td><td style = {style1}>{this.props.onoff}</td>
      <td>{this.props.color}</td>
      <td>{this.props.watt}</td>
      <td>{this.props.hours}</td>
      <td><button id={this.props.id } onClick={this.clickHandler}>x</button></td>
    </tr>

    
    );
  }
}

class Bulbs extends React.Component{
  constructor(props){
    super(props);
    this.handleChildClick = this.handleChildClick.bind(this);
  }

  handleChildClick(id){
    this.props.handleClick(id);
  }

  render(){
    const numbers = this.props.data1;
    const style0 = this.props.data1.color;
    var style1 = {color: 'red'};

    const listItems = numbers.map( (item) => <Bulb brightness={item.brightness} 
      onoff={item.onoff} 
      color={item.color} id={item.id} 
      watt={item.watt} 
      hours = {item.hours} 
      handleClick={this.handleChildClick} />
    );

    return (<div> 
      hi Bulbs!
      <table>
      <tr>
        <th>Brightness</th><th>OnOff</th><th>color</th><th>Watt</th><th>Hours</th><th></th>
      </tr>
       {listItems} </table>
     </div> );

  }
}

class PowerCost extends Component{
  constructor(props){
    super(props);
  }

  
  render(){
    var styleTotal1 = {width:'50%', background: '#aaafff'};

    let myArr = this.props.allData;
    let totalCost = myArr.reduce( (sum, item)=> sum + item.watt*item.hours      , 0);
     {/* assume all use 4 hours a day. change this in state .todo */}

     totalCost = totalCost* 0.14*30/1000;

    return(
      <div style={styleTotal1} >
        <p >Total Power Cost Per 30 Days:  ${totalCost}
        </p>
        <br></br>
        Total Power Cost Based on $0.14 electricity rate per kilo watt hour.
        
      </div>
    );
  }

}
export default App;
