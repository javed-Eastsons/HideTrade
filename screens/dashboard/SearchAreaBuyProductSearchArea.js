import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import { Button, Menu, Divider, Provider } from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import { Dropdown } from "react-native-element-dropdown";

import Colors from "../../constants/Colors";
import SpinView from "../../components/Spin";


//continents start//


const SearchAreaBuyProductSearchArea = (props) => {
  const [countryDropDown, setCountryDropDown] = useState(undefined);
  const [cityDropDown, setCityDropDown] = useState(undefined);

  const [dataLoad, setDataloaded] = useState(false);
  const [apiLoader, setApiLoader] = useState(true);


//Filter API//

// const populateCountryOrOrigin = (continent) => {
  
//   // setApiLoader(true);
//   let webApirUrl = `https://refuel.site/projects/hidetrade/APIs/ViewAllCountryListBYContinent/ViewAllCountryListBYContinent.php?continent_name=${continent.name}`;
//   axios.get(webApirUrl).then((res) => {
//     setCountryDropDown(res.data.Country_List);
//     // setApiLoader(false);
//     // setDataloaded(true);
//   });
// }


// continent starts//
useEffect(() => {
  if (dataLoad == false) {
    setApiLoader(true)
    let webApirUrl = 'https://refuel.site/projects/hidetrade/APIs/ViewAllContinents/ViewAllContinents.php'
    axios.get(webApirUrl).then((res) => {
      
      setContinentDropDown(res.data.Continents_List);
      setApiLoader(false)
      setDataloaded(true)
    })
  }
})



  // useEffect(async () => {
  //   if (dataLoad == false) {
  //     setApiLoader(true);
  //     let webApirUrl = `https://refuel.site/projects/hidetrade/APIs/ViewAllCountryOrOrigin/ViewAllCountryOrOrigin.php`;
  //     // let webApirUrl = `https://refuel.site/projects/hidetrade/APIs/ViewAllCountryListBYContinent/ViewAllCountryListBYContinent.php?continent_name=${continent_name}`;

  //     axios.get(webApirUrl).then((res) => {
  //       console.log(
  //         "response in search area=" + JSON.stringify(res.data.Country_List)
  //       );
  //       //setApi(res.data.Country_List);
  //       setCountryDropDown(res.data.Country_List);
  //       setCityDropDown(res.data.Country_List);
  //       setApiLoader(false);
  //       setDataloaded(true);
  //     });
  //   }
  // }, []);

//continents//
  const [valueContinent, setValueContinent] = useState(null);
  const [labelContinent, setLabelContinent] = useState(null);
  const [isFocusContinent, setIsFocusContinent] = useState(false);
  const [continentDropDown, setContinentDropDown] = useState(undefined);

  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [valueCity, setValueCity] = useState(null);
  const [labelCity, setLabelCity] = useState(null);
  const [isFocusCity, setIsFocusCity] = useState(false);

  console.log("country in search area=" + label);

  //console.log("api=" + JSON.stringify(api));
  //console.log("city=" + JSON.stringify(cityDropDown));
  return (
    <Provider>
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
      ) : (
        <View style={{ flex: 1, backgroundColor: "white" }}>
          <ScrollView>
            <View style={{ marginTop: 10, marginHorizontal: 10 }}>
              <Text style={styles.heading}allowFontScaling={false}>
                In which continent do you want to search?
              </Text>
              <View></View>


              <View>
                <Dropdown
                  style={[styles.dropdown1, isFocusContinent && { borderColor: "black" }]}
                  placeholderStyle={{ fontSize: 16 }}
                  selectedTextStyle={styles.selectedTextStyle1}
                  inputSearchStyle={styles.inputSearchStyle1}
                  iconStyle={styles.iconStyle1}
                  data={continentDropDown}
                  //search
                  //maxHeight={300}
                  labelField="name"
                  valueField="code_1"
                  maxHeight={200}
                  placeholder={!isFocusContinent ? "Continents" : "..."}
                  //searchPlaceholder="Search..."
                  value={valueContinent}
                  onFocus={() => setIsFocusContinent(true)}
                  onBlur={() => setIsFocusContinent(false)}
                  onChange={(item) => {
                    setValueContinent(item.code_1);
                    setLabelContinent(item.name);
                    setIsFocusContinent(false);
                    // populateCountryOrOrigin(item)
                  }}
                />
              </View>


              {/* <View>
               
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: "black" }]}
                  placeholderStyle={{ fontSize: 16 }}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={countryDropDown}
                  search
                  labelField="name"
                  valueField="id"
                  allowFontScaling={false}
                  //maxHeight={400}
                  placeholder={!isFocus ? " Origin " : "..."}
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={(item) => {
                    setValue(item.id);
                    setLabel(item.name);
                    setIsFocus(false);
                  }}
                />{console.log('country=' + value)}

                
              </View> */}

             

             

              

             

              
            </View>
          </ScrollView>
          <View style={{ backgroundColor: "white" }}>
        <View style={{ flexDirection: "row", marginBottom: 15 }}>
          <View>
            <TouchableOpacity
              style={{ flexDirection: "row" }}
              onPress={() => props.navigation.goBack()}
            >
              <Image source={require('../../assets/ByClient/BOTTOMBACK.png')} style={{width:20, height:20, marginHorizontal:10,alignSelf:'center' }} />
                  <Text
                    style={{
                      fontSize: 22,
                      alignSelf: "center",
                      color: "#9EBDB8" ,
                    }}allowFontScaling={false}
                  >
                    Back
                  </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-end",
              flex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                flexDirection: "row",
                justifyContent: "flex-end",
                flex: 1,
              }}
              onPress={() => {
                if (labelContinent != null) {
                  props.navigation.navigate("Product List", {
                    // selectedCountry: label,
                    // selectedCity: labelCity == null ? null : labelCity,
                    selectedContinent: labelContinent == null ? null : labelContinent,
                  });
                } 
               
              }}
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
      </View>
        </View>
      )}

      
    </Provider>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    fontSize: 20,
    marginTop: 10,
    color: Colors.text,
    fontWeight: "500",
    marginBottom: 10,
  },
  menuView: {
    borderWidth: 1,
    width: 200,
    height: 40,
    borderRadius: 6,
    justifyContent: "center",
    alignSelf: "center",
  },
  dropdown: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop:10,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  placeholderStyle1: {
    fontSize: 16,
  },
  selectedTextStyle1: {
    fontSize: 16,
  },
  iconStyle1: {
    width: 20,
    height: 20,
  },
  inputSearchStyle1: {
    height: 40,
    fontSize: 16,
  },
  dropdown1: {
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    // marginTop: 10,
    opacity:1
  },
  icon1: {
    marginRight: 5,
  },
});

export default SearchAreaBuyProductSearchArea;
