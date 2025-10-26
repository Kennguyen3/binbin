// src/views/ProductList/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  headerHome: {
    backgroundColor: '#2079FF',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  titleLocation: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 20,
    lineHeight: 20,
    marginBottom: 10
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#3D8AFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    paddingHorizontal: 15,
    paddingTop: 10,
    paddingBottom: 10
  },
  iconLocation: {
    color: '#FFFFFF',
    marginRight: 10,
  },
  inputLocation: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    marginLeft: 5,
  },
  sliders: {
    height: 150
  },
  customSlide: {
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
    height: 150
  },
  content_cuahang: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  searchData: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'flex-start',
    display:'flex'
  },
  backHeader: {
    width: '10%',
    alignItems: 'center',
    justifyContent: 'center',
    display:'flex',
  },
  backHeaderIMG: {
    width: 30,
    height: 30,
    marginBottom:20,
    marginRight: 10
  },
  groupSeach:{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '90%'
  },
  iconSearch: {
    color: '#000',
    marginRight: 10,
  },
  inputSearch: {
    flex: 1,
    color: '#000',
    fontSize: 14,
    marginLeft: 5,
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5
  },
  titleLeft: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000'
  },
  readMoreRight: {
    color: '#2079FF',
    fontSize: 12
  },
  descriptTitle: {
    marginBottom: 10,
    fontSize: 12,
    color: '#848484'
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
    lineHeight: 12
  },
  starLocaitonGroup: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 16,
    marginTop: 10
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
    fontSize: 12,
    textAlign: 'left',
    color: '#848484'
  },
  hrLine: {
    marginBottom: 10,
    marginTop: 10,
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
    height: 100
  },
  imageStoresLine: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20
  },
  groupInfoStoreLine: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 140
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
