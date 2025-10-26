// src/views/Login/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

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
  contentContainerStyle: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'column',
    paddingBottom: 20,
  },
  menuTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  itemTabs: {
    width: "50%",
    paddingVertical: 20,
    alignItems: 'center',
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
    width: '100%'
  },
  itemMenuActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 20
  },
  paddingHorizontalItemActive: {
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
  },
  headerItemActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
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
  titleStatusCardActiveCancel: {
    fontSize: 12,
    color: '#d9534f',
    lineHeight: 12,
  },
  bodyItemActive: {
    display: "flex",
    flexDirection: "column",
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    marginTop: 10
  },
  storeNameActive: {
    display: "flex",
    flexDirection: "row",
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%'
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
    width: '100%'
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
    width: "100%",
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
  }
});