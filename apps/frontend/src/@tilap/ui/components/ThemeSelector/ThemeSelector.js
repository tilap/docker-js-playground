import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem, Switch } from '@material-ui/core';
import { Tooltip } from '../../';

const ThemeSelector = ({ color, helpText, currentThemeId, themesIds, setTheme }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  switch (themesIds.length) {
    case 1:
      return null;
    case 2: {
      const otherTheme = themesIds.filter(id => id !== currentThemeId)[0];
      const toggleVariant = () => {
        setTheme(otherTheme);
      };

      const text = helpText || `Switch theme to "${otherTheme}"`;
      const checked = themesIds.indexOf(currentThemeId) === 0;
      return (
        <Tooltip title={text}>
          <Switch
            checked={checked}
            onChange={toggleVariant}
            value="variant"
            color={color}
            inputProps={{ 'aria-label': helpText }}
          />
        </Tooltip>
      );
    }
    default: {
      const handleClick = event => setAnchorEl(event.currentTarget);

      const handleThemeSelect = id => () => {
        setTheme(id);
        setAnchorEl(null);
      };
      const handleClose = () => setAnchorEl(null);

      const text =
        helpText ||
        `Select one of the other themes: "${themesIds
          .filter(id => id !== currentThemeId)
          .join('", "')}"`;
      return (
        <>
          <Tooltip title={text}>
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Theme
            </Button>
          </Tooltip>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            {themesIds.map(id => (
              <MenuItem key={id} selected={id === currentThemeId} onClick={handleThemeSelect(id)}>
                {id}
              </MenuItem>
            ))}
          </Menu>
        </>
      );
    }
  }
};

ThemeSelector.propTypes = {
  color: PropTypes.string,
  helpText: PropTypes.string,
  currentThemeId: PropTypes.string.isRequired,
  themesIds: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTheme: PropTypes.func.isRequired,
};

ThemeSelector.defaultProps = {
  color: 'default',
};

export default ThemeSelector;
