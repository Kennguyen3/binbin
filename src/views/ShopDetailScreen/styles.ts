// src/views/ProductList/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

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
    height: 150,
    position: 'relative',
    zIndex: 1
  },
  backHeader: {
    width: 28,
    height: 28,
    position: 'absolute',
    zIndex: 2,
    top: 20,
    left: 20
  },
  backHeaderIMG: {
    width: 28,
    height: 28,
  },
  shareHeader: {
    width: 28,
    height: 28,
    position: 'absolute',
    zIndex: 2,
    top: 20,
    right: 20
  },
  shareHeaderIMG: {
    width: 28,
    height: 28
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
  group_titleStore: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    width: "100%",
    justifyContent: 'flex-start',
    marginTop: 20
  },
  ico_titleStore: {
    width: 16,
    height: 16,
    marginRight: 10
  },
  ico_titleGroup: {
    width: 16,
    height: 16,
    marginRight: 5
  },
  tt_store: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold'
  },
  add_store: {
    fontSize: 10,
    color: '#848484',
    marginTop: 5
  },
  searchData: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#EFEFEF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    paddingHorizontal: 15,
    marginBottom: 20
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
  groupTitileImage: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
    width: width * 0.7,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: '#ffffff',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Android Shadow
    elevation: 3,
    position: 'relative',
    borderRadius: 8,
  },
  imgVoucherDiscount: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: '#2079FF'
  },
  contentVoucher: {
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    top: 0,
    left: 0,
    borderStyle: 'dashed',
    paddingLeft: 10,
    width: width * 0.7 - (94)
  },
  viewBtnVoucher: {
    width: 44,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    borderStyle: 'dashed',
    borderLeftColor: '#EFEFEF',
    borderLeftWidth: 2
  },
  textContentVoucher: {
    color: '#000000',
    fontSize: 10,
    margin: 0,
    lineHeight: 12
  },
  textViewBtnVoucher: {
    color: '#2079FF',
    fontSize: 10,
    margin: 0,
    lineHeight: 12
  },
  pricediscount: {
    width: 44,
    height: 44,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0
  },
  textPriceStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    textShadowColor: 'yellow',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 0.2,
  },
  imgBgDiscount: {
    width: 44,
    height: 44,
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
    fontSize: 10,
    textAlign: 'left',
    color: '#000',
    fontWeight: 'bold',
    overflow: 'hidden',
    width: '100%',
    lineHeight: 16,
    paddingRight: 10
  },
  rating_fatory: {
    marginTop: 20,
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    marginBottom: 10
  },
  starLocaitonGroup: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    height: 20,
  },
  fatoryGroup: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  fatoryTitle: {
    fontSize: 12,
    textAlign: 'left',
    color: '#000000'
  },
  factoryStore: {
    marginLeft: 5,
    width: 12,
    height: 10
  },
  starGroup: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  starIco: {
    width: 11,
    height: 11,
    marginRight: 5
  },
  starTitle: {
    fontSize: 12,
    textAlign: 'left',
    color: '#000000'
  },
  starReviewRating: {
    fontSize: 12,
    textAlign: 'left',
    color: '#2079FF',
    marginLeft: 10
  },
  locationGroup: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    borderRightWidth: 1,
    borderRightColor: '#848484',
    marginRight: 10,
    paddingRight: 10,
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
    width: width * 0.7,
    height: 100,
    backgroundColor: '#ffffff',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    // Android Shadow
    elevation: 3,
    position: 'relative',
    borderRadius: 8,
    marginRight: 20
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
    height: 140,
    paddingBottom: 10,
    paddingTop: 10
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
  groupDesTitle: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column',
    height: 80,
  },
  descriptionStore: {
    fontSize: 10,
    textAlign: 'left',
    color: '#848484',
    width: '100%',
    paddingRight: 10,
    height: 18,
    overflow: 'hidden'
  },
  soildedStore: {
    fontSize: 8,
    textAlign: 'left',
    color: '#000',
    width: '100%',
  },
  groupAddtoCartPrice: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
    paddingRight: 10,
    marginTop: 5
  },
  priceProductList: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#000000'
  },
  plusCart: {
    width: 21,
    height: 21
  },
  categoryContainer: {
    width: '100%'
  },
  titleGroupCategory: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20
  },
  itemContainerStoresLineCategory: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row',
    flex: 1,
    width: '100%',
    height: 100,
    backgroundColor: '#ffffff',
    // iOS Shadow
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    // Android Shadow
    elevation: 2,
    position: 'relative',
    borderRadius: 8,
    marginBottom: 20
  },
  containerFooter: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    width: '100%',
    borderTopWidth: 1,
    borderTopColor: '#E5EBE8',
    backgroundColor: 'white',
    padding: 20
  },
  cartPriceFooter: {
    width: '50%',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  cartFooter: {
    width: 12,
    height: 16,
    marginRight: 5
  },
  priceFooter: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 14
  },
  checkOutFooter: {
    backgroundColor: '#2079FF',
    borderRadius: 8,
    padding: 10,
    width: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCheckout: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  // cart
  containerModal: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: width,
    height: height,
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.9)',
    zIndex: 13,
    justifyContent: 'flex-end', // Đẩy nội dung xuống dưới
    alignItems: 'center',
  },
  bannerProduct: {
    zIndex: 14,
    position: 'relative',
    height: 200,
    width: '100%',
  },
  groupCloseImg: {
    position: 'absolute',
    left: 20,
    top: 20,
  },
  closeImg: {
    width: 28,
    height: 28
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  productInfo: {
    backgroundColor: '#fff',
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    width: '100%',
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },
  description: {
    color: '#848484',
    marginBottom: 4,
    fontSize: 12
  },
  sold: {
    color: '#000000',
    marginBottom: 16,
    fontSize: 12
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderColor: '#EFEFEF',
    paddingBottom: 10
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontSize: 18,
    marginHorizontal: 10,
    color: '#000',
    fontWeight: 'bold'
  },
  btnPlus:{
    display:'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 3,
    backgroundColor: '#DBE9FF'
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    color: '#000',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    padding: 8,
    marginBottom: 16,
    height: 100,
    textAlignVertical: 'top' 
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  totalLabel: {
    fontSize: 16,
    color: '#888',
  },
  totalPrice: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
  addToCartButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 100
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
