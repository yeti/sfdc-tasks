import React from 'react'
import { connect } from 'react-redux'
import { Spinner } from 'react-lightning-design-system'
import PropTypes from 'prop-types'

export const Loader = ({ hasLoaded }) => {
  if (!hasLoaded) {
    return (<Spinner size="medium" />)
  }
  return null;
};

Loader.propTypes = {
  hasLoaded: PropTypes.bool.isRequired,
  }

const mapStateToProps = (state) => ({
  hasLoaded: state.hasLoaded
})

export default connect(mapStateToProps)(Loader);
