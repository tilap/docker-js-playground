import React, { useState } from 'react';
import assert from 'assert';
import PropTypes from 'prop-types';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';
import ThemesContext from './ThemesContext';

const createThemeFromConfig = config => responsiveFontSizes(createMuiTheme(config));

const ThemesProvider = ({ config, default: defaultThemeProp = '', ...props }) => {
  const themesIds = Object.keys(config);
  assert(themesIds.length > 0, 'At least one theme is required');
  assert(
    !defaultThemeProp || themesIds.includes(defaultThemeProp),
    `Default theme ${defaultThemeProp} does not exist`
  );

  const defaultThemeId = defaultThemeProp || themesIds[0];
  const [themeId, setThemeId] = useState(defaultThemeId);

  const muiThemesConfigs = new Map(themesIds.map(id => [id, createThemeFromConfig(config[id])]));
  const setTheme = id => {
    assert(themesIds.includes(id), `Theme ${id} does not exists`);
    setThemeId(id);
  };

  return (
    <ThemesContext.Provider
      value={{
        currentThemeId: themeId,
        currentTheme: muiThemesConfigs.get(themeId),
        setTheme,
        themesIds,
      }}
      {...props}
    />
  );
};

ThemesProvider.propTypes = {
  config: PropTypes.shape({}),
  default: PropTypes.string,
};

export default ThemesProvider;
