import React from 'react';


class Home extends React.Component {
  render(){
    return (
    <body style={{display: "flex", justifyContent:"center", alignItems:"center",width: "100vw", height: "100vh",backgroundImage:"url(https://media2.giphy.com/media/BHNfhgU63qrks/giphy.gif)",  backgroundSize:"cover"}}>
      <div style={{color:"white", fontSize:"30px"}}>
          Hit Me Up
            <br/>
            <br/>
            <div style={{color:"white", fontSize:"15px"}}>
              The Future of Communication
            </div>
            <div class="ui large buttons">
              <button class="ui button" onClick={()=>this.props.history.push("/login")}>Login</button>
            <div class="or"></div>
              <button class="ui button" onClick={()=>this.props.history.push("/register")}>Register</button>
            </div>
      </div>
    </body>
    )
  }
}



export default (Home);
