import PropTypes from 'prop-types';

const teamShape = PropTypes.shape({
  imageUrl: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  position: PropTypes.string.isRequired,
  uid: PropTypes.string.isRequired,
});

export default { teamShape };
