import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip as TooltipComponent, makeStyles } from '@material-ui/core';
import arrowGenerator from './arrowGenerator';

const useStylesArrow = makeStyles(theme => ({
  tooltip: {
    position: 'relative',
    backgroundColor: theme.components.tooltip.backgroundColor,
    color: theme.components.tooltip.color,
    fontSize: theme.components.tooltip.fontSize,
    boxShadow: theme.shadows[1],
  },
  arrow: {
    position: 'absolute',
    fontSize: 6,
    '&::before': {
      content: '""',
      margin: 'auto',
      display: 'block',
      width: 0,
      height: 0,
      borderStyle: 'solid',
    },
  },
  popper: arrowGenerator(theme.components.tooltip.backgroundColor),
}));

const Tooltip = props => {
  const { arrow, ...classes } = useStylesArrow();
  const [arrowRef, setArrowRef] = React.useState(null);

  return (
    <TooltipComponent
      classes={classes}
      PopperProps={{
        popperOptions: {
          modifiers: {
            arrow: {
              enabled: Boolean(arrowRef),
              element: arrowRef,
            },
          },
        },
      }}
      {...props}
      title={
        <React.Fragment>
          {props.title}
          <span className={arrow} ref={setArrowRef} />
        </React.Fragment>
      }
    />
  );
};

Tooltip.propTypes = {
  title: PropTypes.node,
};

export default Tooltip;
