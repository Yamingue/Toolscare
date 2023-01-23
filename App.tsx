import React, { useRef, useState } from "react"
import { Modal, Pressable, StatusBar, StyleSheet, Text, View } from "react-native"
import WebView from "react-native-webview"

const App = () => {
  const [progress, setProgress] = useState(0)
  const [modalVisible, setModalVisible] = useState(false)
  const [loadModal, setLoadModal] = useState(false)
  const web = useRef()

  return <>
    <StatusBar backgroundColor={'red'} barStyle='dark-content' hidden={false} />
    <View style={style.main}>
      <WebView
        ref={web}
        style={style.webview}
        source={{ uri: 'https://toolscare.umoyatech.ca' }}
        javaScriptEnabled
        onError={(e) => {
          console.log(e)
          setTimeout(() => {

            setModalVisible(true)
          }, 2000)
        }}
        onLoadEnd={(ev) => {
          console.log('load complet')
          setLoadModal(false)
        }}
        onLoadStart={() => {
          setLoadModal(true)
        }}
        onLoadProgress={({ nativeEvent }) => {
          console.log(nativeEvent.progress)
          let p = nativeEvent.progress * 100
          setProgress(Math.round(p))
        }}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>An error has occurred</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => {
                setModalVisible(false)
                web.current.reload()
              }}>
              <Text style={styles.textStyle}>Refresh</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        visible={loadModal}
        onRequestClose={() => {
          setLoadModal(!loadModal);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{progress}% loading</Text>
          </View>
        </View>
      </Modal>
    </View>
  </>
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    marginTop:5
  },
  webview: {

  },
  loader: {
    position: 'absolute',
    height: 200,
    width: '70%',
    backgroundColor: '#93DE5D',
    borderRadius: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center'

  }
})


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default App