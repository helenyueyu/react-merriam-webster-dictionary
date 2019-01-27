import React, { Component } from 'react';
import { Container, Form, Label, Button } from 'semantic-ui-react'

import './App.css'
import 'semantic-ui-css/semantic.min.css'

import logo from './logo2.png'

let dictionary = 'collegiate'
let thesaurus = 'thesaurus'
const API_KEY = 'a0e1158e-1888-4f7c-ac9b-fe99060d5011'

class App extends Component {
  state = {
    dictionary_word: null,
    thesaurus_word: null,
    def: null,
    syn: null
  }
  onChangeDictionary = (e) => {
    this.setState({
      dictionary_word: e.target.value
    })
  }
  onChangeThesaurus = (e) => {
    this.setState({
      thesaurus_word: e.target.value
    })
  }
  onSubmitDictionary = (e) => {
    e.preventDefault()
    fetch(`https://www.dictionaryapi.com/api/v3/references/${dictionary}/json/${this.state.dictionary_word}?key=${API_KEY}`)
      .then(data => data.json())
      .then(data => this.setState({
        def: data[0].shortdef,
        syn: null
      }))
  }
  onSubmitThesaurus = (e) => {
    e.preventDefault()
    fetch(`https://www.dictionaryapi.com/api/v3/references/${thesaurus}/json/${this.state.dictionary_word}?key=${API_KEY}`)
      .then(data => data.json())
      .then(data => this.setState({
        def: null,
        syn: data[0].meta.syns
      }))
  }

  render() {
    const containerStyle = {
      padding: '5rem',
      background: '#004990',
      height: '100vh'
    }
    const labelStyleDictionary = {
      color: '#D71920',
      background: 'white',
      border: '1px solid #D71920'
    }
    const labelStyleThesaurus = {
      color: '#004990',
      background: 'white',
      border: '1px solid #004990'
    }
    const buttonStyleDictionary = {
      background: '#D71920',
      borderRadius: '10px',
      color: 'white'
    }
    const buttonStyleThesaurus = {
      background: '#004990',
      borderRadius: '10px',
      border: '1px solid white',
      color: 'white'
    }
    const h1Style = {
      fontFamily: 'Open Sans'
    }
    const inputStyle = {
      outline: 'none',
      padding: '0rem !important'
    }
    return (
      <Container style={containerStyle}>
      <img src={logo} alt="MW Logo" width='125px'/>

      <p style={{color: 'white'}}>
        Note: This app uses the <em>Merriam-Webster's Collegiate®</em> dictionary, as well as the <em>Merriam-Webster thesaurus</em>.
      </p>

      <Form onSubmit={this.onSubmitDictionary}>
        <Form.Group>
        <Label style={labelStyleDictionary}><h1 style={h1Style}>Dictionary</h1></Label>
        <input style={inputStyle} onChange={this.onChangeDictionary}/>
        <Button style={buttonStyleDictionary} type="submit">search</Button>
        </Form.Group>
      </Form>
      <Form onSubmit={this.onSubmitThesaurus}>
        <Form.Group>
        <Label style={labelStyleThesaurus}><h1 style={h1Style}>Thesaurus</h1></Label>
        <input onChange={this.onChangeThesaurus}/>
        <Button style={buttonStyleThesaurus} type="submit">search</Button>
        </Form.Group>
      </Form>
      <div style={{color: 'white'}}>
          {this.state.def && this.state.def.map((x, idx) => <li key={idx}>{idx+1}) {x}</li>)}
      </div>
      <div style={{color: 'white'}}>
          {this.state.syn && this.state.syn}
      </div>
      </Container>
    );
  }
}

export default App;
