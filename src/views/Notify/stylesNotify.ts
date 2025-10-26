import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    position: 'relative'
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  content_cuahang: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  listStores: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainerStores: {
    paddingHorizontal: 10,
  },
  itemContainerStores: {
    width: width * 0.35,
    marginRight: 10
  },
  imageStores: {
    width: '100%',
    height: 110,
    borderRadius: 10,
    marginBottom: 10
  },
  titleStoresGroup: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 16
  },
  iconTitleStores: {
    width: 11,
    height: 11,
    marginRight: 5
  },
  titleStores: {
    fontSize: 12,
    textAlign: 'left',
    color: '#000',
    fontWeight: 'bold',
    overflow: 'hidden',
    width: '80%',
    lineHeight: 16
  },
  starLocaitonGroup: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 16,
    marginTop: 10,
    position: "relative",
    zIndex: 12,
  },
  starGroup: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: 10,
    paddingRight: 10,
    borderRightWidth: 1,
    borderRightColor: '#848484'
  },
  starIco: {
    width: 11,
    height: 11,
    marginRight: 5
  },
  starTitle: {
    fontSize: 12,
    textAlign: 'left',
    color: '#848484'
  },
  wishlistIco: {
    width: 12,
    height: 10.4,
    position: "absolute",
    right: 0,
    bottom: 0,
    zIndex: 10
  },
  locationGroup: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  locationIco: {
    width: 9,
    height: 11.3,
    marginRight: 5
  },
  locationTitle: {
    fontSize: 10,
    textAlign: 'left',
    color: '#848484'
  },
  hrLine: {
    marginBottom: 10,
    marginTop: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    width: width + 40,
    marginLeft: -20
  },
  itemContainerStoresLine: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    marginBottom: 10,
    width: width - 46,
    height: 78
  },
  imageStoresLine: {
    width: 40,
    height: 40,
    borderRadius: 10,
    marginRight: 20
  },
  groupInfoStoreLine: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 78
  },
  mgT10: {
    marginTop: 10
  },
  titleStoresGroupLine: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 16,
    overflow: 'hidden'
  },
  groupDesTitle : {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'column',
  },
  descriptionStore: {
    fontSize: 10,
    textAlign: 'left',
    color: '#848484',
    width: '100%',
    marginTop: 5
  }
});