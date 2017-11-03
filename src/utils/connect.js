import { connect } from 'react-redux';

export default (mapStateToProps, mapDispatchToProps) => {
  const mapStateToPropsWithMobile = state => ({
    ...(mapStateToProps ? mapStateToProps(state) : {}),
    isMobile: state.mobile.isMobile
  });
  return connect(mapStateToPropsWithMobile, mapDispatchToProps);
}
