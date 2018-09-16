import React, { Component } from 'react'

export function Form(WrappedComponent, fields) {
  return class extends React.Component {
    state = {
      fields: {},
      values: {}
    }

    componentWillMount() {
      fields.forEach(field => {
        const fieldProps = {
          onChange: this.handleInputChange,
          id: field,
          name: field
        }

        Object.defineProperty(fieldProps, 'value', {
          get: () => this.state.values[field]
        });

        this.state.fields[field] = fieldProps
        this.state.values[field] = null
      })
    }

    handleInputChange = (event) => {
      const target = event.target
      const value = ((target.type === 'checkbox') ? target.checked : target.value)
      const name = target.name

      this.setState({
        values: {
          ...this.state.values,
          [name]: value
        }
      })
    }

    render() {
      return (
        <WrappedComponent
          fields={this.state.fields}
          values={this.state.values}
          {...this.props}
        />
      )
    }
  }
}