// src/views/Login/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: '#EEEEEE',
    position: 'relative',
    width: "100%"
  },
  HeaderCusomeProfile :{
    width: "100%",
    height: 300,
    backgroundColor: "#2079FF",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    flexDirection: "column",
    zIndex: 0,
    position: "absolute",
    top: 0,
    left: 0
  },
  HeaderGroup:{
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: "center",
    flexDirection: "row",
    width: "100%",
    gap: 20,
    paddingHorizontal: 20,
    marginTop: 100
  },
  IconName: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#EEEEEE",
    justifyContent: 'center',
    alignItems: "center"
  },
  GroupPhoneName :{
    display: "flex",
    justifyContent: 'flex-start',
    alignItems: "flex-start",
    flexDirection: "column",
  },
  headerName :{
    display: "flex",
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  headerPhone :{
    display: "flex",
    fontSize: 14,
    color: "#FFFFFF",
    fontWeight: "bold"
  },
  IconText :{
    display: "flex",
    fontSize: 18,
    fontWeight: "bold"
  },
  contentContainer: {
    flexGrow: 1,
    paddingBottom: 200,
    marginTop: 200,
    position: "relative",
    paddingHorizontal: 20,
    width: "100%"
  },
  menuTabs: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    width: "100%",
    backgroundColor: "#ffffff",
    paddingHorizontal: 20,
    borderRadius: 20,
    padding: 20,
    marginBottom: 30
  },
  titleHeaderGroup: {
    width: "100%",
    marginBottom: 20,
    fontSize: 14,
    fontWeight: "bold",
    color: "#000"
  },
  item_list: {
    width: "100%",
    padding: 10,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  btnNext: {
    fontWeight: 'bold',
    color: "#444444"
  },
  btnNextRed: {
    color: '#990000'
  },
  group_1: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    flexDirection: 'row'
  },
  itemTabs: {
    width: "50%",
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  activeItem: {
    borderBottomColor: '#2079FF',
  },
  itemText: {
    color: 'black',
    fontSize: 14
  },
  activeItemText: {
    color: '#2079FF',
    fontWeight: 'bold'
  },
  listMenuActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: "100%"
  },
  itemMenuActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: "100%",
    marginTop: 20
  },
  paddingHorizontalItemActive: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: "100%",
  },
  headerItemActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF'
  },
  infoCardActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start'
  },
  idCardActive: {
    fontSize: 12,
    color: '#000000',
    marginBottom: 5
  },
  timeCardActive: {
    fontSize: 12,
    color: '#848484'
  },
  statusCardActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: 'center',
    columnGap: 5
  },
  icoReadmoreStoreOld: {
    width: 14,
    height: 14,
    marginBottom: 3
  },
  colorStatusCardActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FBBC05",
    marginBottom: 2
  },
  titleStatusCardActive: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 12,
  },
  bodyItemActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: "100%",
    marginTop: 10
  },
  storeNameActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%"
  },
  titleStoreCardActive: {
    fontSize: 14,
    color: '#000000',
    fontWeight: "bold"
  },
  groupTitleReadmoreStoreActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: 10,
    width: 130
  },
  titleReadmoreStoreActive: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 12
  },
  icoReadmoreStoreActive: {
    width: 5,
    height: 9,
    objectFit: "cover"
  },
  infoProductCardActive: {
    marginTop: 10,
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%"
  },
  listsProductCardActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    rowGap: 5,
  },
  itemProductCardActive: {
    fontSize: 12,
    color: '#000000'
  },
  infoPriceViewCardActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    rowGap: 5,
  },
  priceCardActive: {
    fontSize: 12,
    color: '#000000'
  },
  groupTotalProductCardActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'flex-end',
    alignItems: 'center',
    columnGap: 10,
    width: 130
  },
  totalProductCardActive: {
    fontSize: 12,
    color: '#000000',
    lineHeight: 12,
  },
  iconReadmoreDetailCardActive: {
    width: 5,
    height: 9,
    objectFit: "cover"
  },
  footerItemActive: {
    width: "100%",
    padding: 20,
    marginTop: 20,
    backgroundColor: "#DBE9FF",
    display: "flex",
    justifyContent: 'center',
    alignItems: "center",
    rowGap: 5
  },
  statusGrabOrderActive: {
    fontSize: 14,
    color: "#2079FF",
    fontWeight: "bold"
  },
  timeStatusGrabOrderActive: {
    fontSize: 12,
    color: "#2079FF"
  },
  footerItemOld: {
    width: "100%",
    padding: 20,
    marginTop: 20,
    display: "flex",
    justifyContent: 'space-between',
    alignItems: "center",
    flexDirection: "row",
  },
  btnRatingCardOld: {
    width: "48%",
    borderRadius: 5,
    backgroundColor: "#DBE9FF",
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center"
  },
  btnTextRatingCardOld: {
    color: "#2079FF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center',
    width: "100%",
  },
  btnTryOrderOld: {
    width: "48%",
    borderRadius: 5,
    backgroundColor: "#2079FF",
    paddingTop: 20,
    paddingBottom: 20,
    textAlign: "center"
  },
  btnTextTryOrderOld: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: 'center',
    width: "100%",
  },
  label: {
    fontWeight: 'bold',
    marginTop: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginTop: 5,
    width: "100%"
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'space-between',
    display:"flex",
    alignItems: "center",
    width: "100%"
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#aaa',
    padding: 12,
    borderRadius: 6,
  },
  changeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 6,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 6,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2079FF',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 6,
    color: '#333',
  },
  text: {
    fontSize: 14,
    color: '#555',
    lineHeight: 22,
  },
  bullet: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginTop: 4,
  },
  emailContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    marginBottom: 16,
  },
  emailText: {
    color: '#2079FF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    marginTop: 30,
    textAlign: 'center',
    fontSize: 13,
    color: '#888',
  },
  refundTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#D35400',
    textAlign: 'center',
    marginBottom: 20,
  },
  refundSectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    color: '#2C3E50',
  },
  refundParagraph: {
    fontSize: 14,
    lineHeight: 22,
    color: '#34495E',
    marginBottom: 10,
  },
  refundBullet: {
    fontSize: 14,
    color: '#34495E',
    marginLeft: 10,
    marginBottom: 6,
  },
  refundEmail: {
    color: '#2980B9',
    fontWeight: '600',
  },
  refundFooter: {
    marginTop: 30,
    fontSize: 13,
    textAlign: 'center',
    color: '#7F8C8D',
  },
  termsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C3E50',
    textAlign: 'center',
    marginBottom: 20,
  },
  termsSection: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 8,
    color: '#34495E',
  },
  termsText: {
    fontSize: 14,
    lineHeight: 22,
    color: '#555',
    marginBottom: 10,
  },
  termsBullet: {
    fontSize: 14,
    color: '#555',
    marginLeft: 10,
    marginBottom: 6,
  },
  termsEmail: {
    color: '#2079FF',
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
  },
  termsFooter: {
    marginTop: 30,
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
  },
});