// src/views/Login/styles.ts
import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    flexDirection: 'column',
    backgroundColor: '#FFFFFF'
  },
  header_navbar: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
    height: 100
  },
  backHeader: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
    position: 'absolute',
    left: 20
  },
  logo: {
    width: 14,
    height: 14,
    resizeMode: 'contain',
  },
  welcome: {
    fontSize: 24,
    color: '#000000',
    fontWeight: 'bold'
  },

  placeholder: {
    color: '#000000',
    fontSize: 14,
    width: '100%',
    textAlign: 'left',
    marginBottom: 20
  },
  tryResendCode: {
    color: '#2079FF',
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
  },
  tryResendCodeBlack: {
    color: '#DDD',
    fontSize: 14,
    width: '100%',
    textAlign: 'center',
  },
  groupInput: {
    flexDirection: 'row',     // Đảm bảo các thành phần con nằm cùng hàng ngang
    alignItems: 'center',     // Căn giữa theo chiều dọc
    paddingHorizontal: 20,    // Khoảng cách ngang
    paddingVertical: 5,      // Khoảng cách dọc
    borderWidth: 1,           // Đường viền
    borderRadius: 5,          // Độ cong viền
    borderColor: '#ccc',
    marginBottom: 10
  },
  prefixText: {
    paddingRight: 10,         // Khoảng cách phải của text
    borderRightWidth: 1,      // Độ dày của đường viền
    borderColor: '#ccc',      // Màu của đường viền
    color: "#000"
  },
  input: {
    flex: 1,                  // Mở rộng input
    height: 40,               // Chiều cao của input
    paddingLeft: 10,          // Khoảng cách bên trái
    color: '#000', 
  },
  btnNext: {
    width: '100%',
    borderRadius: 5,
    padding: 15,
    textAlign: 'center',
    backgroundColor: '#2079FF',
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 20
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#D9D9D9',
    marginBottom: 30,
    marginTop: 30,
    position: 'relative'
  },
  divi_text: {
    position: 'absolute',
    zIndex: 1,
    fontSize: 14,
    width: 80,
    lineHeight: 14,
    padding: 10,
    top: -16,
    backgroundColor: '#FFFFFF',
    textAlign: 'center',
    left: Dimensions.get('window').width / 2 - 50,
    color: '#000000'
  },
  buttonLogin: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 50,
    backgroundColor: '#F3F3F3', // Màu của nút Facebook
    borderRadius: 5,
    justifyContent: 'flex-start',
    marginBottom: 10,
    paddingHorizontal: 20,
    position: 'relative'
  },
  iconLogin: {
    width: 20,
    height: 20,
    marginRight: 10,
    position: 'absolute',
    left: 15,
    top: 15
  },
  buttonTextLogin: {
    fontSize: 14,
    color: '#000', // Màu chữ
    width: '100%',
    textAlign: 'center'
  },
});
