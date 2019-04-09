import React from "react";

import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class HeaderStyleDropdown extends React.Component {
  onToggle = event => {
    let value = event.target.value;
    this.props.onToggle(value);
  };

  render() {
    return (
      <FormControl>
        <Select value={this.props.active} onChange={this.onToggle}>
          <MenuItem value="">Wybór Headera</MenuItem>
          {this.props.headerOptions.map(heading => {
            return <MenuItem value={heading.style}>{heading.label}</MenuItem>;
          })}
        </Select>
      </FormControl>
    );
  }
}

export default HeaderStyleDropdown;
