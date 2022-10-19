import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,Alert, ActivityIndicator
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import axios from "axios";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";

const SubCategorySellLeather = (props) => {
  const [size, setSize] = useState(undefined);
  const [subCategory, setSubCategory] = useState(undefined);
  const [selected, setSelected] = useState([]);
  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);

  var productName=props.route.params.productName;
  var category=props.route.params.category;

  const renderSubCategory = ({ item, index }) => {
    const { brand_id, brand_title, image_name } = item;
    const isSelected = selected.filter((i) => i === brand_id).length > 0;

    return (
      <TouchableOpacity
        onPress={() => {
          if (isSelected) {
            setSelected((prev) => prev.filter((i) => i !== brand_id));
          } else {
            setSelected((prev) => [brand_id]);
          }
        }}
        style={[
          styles.item,
          isSelected && { backgroundColor: Colors.buttonBackground },
        ]}
      >
        <Image
          style={[ {width: 108, height: 108}, isSelected && {width:108, height:108}  ]}
          source={{
            uri:
              "https://refuel.site/projects/hidetrade/UPLOAD_file/" +
              image_name,
          }}
        />
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    if(dataLoad==false){
      setApiLoader(true)
      let webApiUrl = `https://refuel.site/projects/hidetrade/APIs/SubcategoryDataAPI/RestController.php?view=all`;
      axios.get(webApiUrl).then((res) => {
        console.log("SubCategory Response", res)
        setSubCategory(res.data);
        setApiLoader(false);
        setDataloaded(true);
      });
    }
   
  }, []);

  useEffect(() => {
    let webApiUrl = `https://refuel.site/projects/hidetrade/APIs/ViewAllProductSize/ViewAllProductSize.php`;
    axios
      .get(webApiUrl)
      .then((res) => {
        setSize(res.data.Output);
        //console.log("size=" + JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
          {apiLoader ? (
        // <View
        //   style={{
        //     width: "100%",
        //     height: "100%",
        //     justifyContent: "center",
        //     alignItems: "center",
        //     backgroundColor: "#ffffff",
        //     opacity: 1,
        //     zIndex: 5,
        //   }}
        // >
        //   <Image
        //     source={require("../../assets/loader.jpg")}
        //     resizeMode="contain"
        //     resizeMethod="scale"
        //     style={{ width: 100, height: 100, marginBottom: 10 }}
        //   />
        //   <ActivityIndicator size={"large"} color="red" />
        // </View>
        <SpinView style={{alignItems:'center', justifyContent:'center', flex:1}}>
           <Image
            source={require("../../assets/loader.jpg")}
            resizeMode="contain"
            resizeMethod="scale"
            style={{ width: 80, height: 80 }}
          /><Text style={{fontWeight:'bold', marginTop:10}}>Loading...</Text>
        </SpinView>
      ) : (<View style={{flex:1}}>
      <ScrollView>
        <View style={{ marginBottom: 15,  marginTop: 15, marginHorizontal:10 }}>
          <Text allowFontScaling={false} style={{ color: Colors.text, fontSize: 18, marginBottom: 20, textAlign:'center', fontWeight:'bold' }}>
            What kind of leather you would like to sell?
          </Text>
          <View>
            {subCategory != undefined ? (
              <View>
                <FlatList
                  numColumns={3}
                  data={subCategory.output}
                  renderItem={renderSubCategory}
                  scrollEnabled={false}
                />
              </View>
            ) : null}
          </View>
        </View>
      </ScrollView>
      <View style={{ flexDirection: "row", marginBottom: 15 }}>
        <View>
          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => props.navigation.goBack()}
          >
            <Image source={require('../../assets/ByClient/BOTTOMBACK.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
            <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "#9EBDB8" , }}
            >
              Back
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{ flexDirection: "row", justifyContent: "flex-end", flex: 1 }}
        >
          <TouchableOpacity
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              flex: 1,
            }}
            onPress={() =>{if(selected!=''){
              props.navigation.navigate("Size Page", { size: size, productName:productName, category:category, subCategory:selected })
            }else{Alert.alert('',"Please choose Sub-Category",[{text:'Ok',style:'cancel'}])}}}
          >
            <Text allowFontScaling={false}
              style={{ fontSize: 22, alignSelf: "center", color: "#62B0A2" }}
            >
              Next
            </Text>
            <Image source={require('../../assets/ByClient/BOTTOMNEXT.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
          </TouchableOpacity>
        </View>
      </View>
      </View>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: Constants.statusBarHeight,
    backgroundColor: "#fff",
    //padding: 8,
  },

  item: {
    alignItems: "center",
    justifyContent: "center",
    //borderWidth: 1,
    //backgroundColor: Colors.inactiveState,
    borderRadius: 8,
    marginVertical: "0.4%",
      marginHorizontal:'0.4%',
    width: "32.5%",
    height: 120,
    //flex:1
  },
});

export default SubCategorySellLeather;
