import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  View,
  NativeModules,
  NativeEventEmitter
} from "react-native";
import React, { useState, useEffect } from "react";
import LinearGradient from "react-native-linear-gradient";
import Header from "../components/Header";
import Tags from "../components/Tags";
import ProductCard from "../components/ProductCard";
import data from "../data/data.json";
import { v4 as uuidv4 } from 'uuid';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { loadCGCampaign, registerUser, setCGScreenName } from "../customerglu/CGManger"

const HomeScreen = () => {
  const [products, setProducts] = useState(data.products);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      setCGScreenName("HomeScreen");
    }, [])
  );
  useEffect(() => {
    // Call registerUser when the component mounts
    // pass your userId
    registerUser("glutest-78");

   

    return () => {
    //  eventanalytics.remove();
     // eventdeeplink.remove();
    

  }


  }, []);
  const handleProductDetails = (item) => {
    navigation.navigate("PRODUCT_DETAILS", { item });
  };

  const toggleFavorite = (item) => {
    setProducts(
      products.map((prod) => {
        if (prod.id === item.id) {
          console.log("prod: ", prod);
          return {
            ...prod,
            isFavorite: !prod.isFavorite,
          };
        }
        return prod;
      })
    );
  };

  return (
    <LinearGradient colors={["#FDF0F3", "#FFFBFC"]} style={styles.container}>
      {/* header */}
      <Header />

      <FlatList
        ListHeaderComponent={
          <>
            <View>
              <Text style={styles.headingText}>Match Your Style</Text>
              <View style={styles.inputContainer}>
                <Image
                  source={require("../assets/search.png")}
                  style={styles.searchIcon}
                />
                <TextInput placeholder="Search" style={styles.textInput} />
              </View>
              
              {/* Full-width image */}
              <TouchableOpacity
              onPress={() => {
                loadCGCampaign("cf33fc67-e527-4d25-8c4d-09f378f7de48")
              }}>
              <Image
                source={{ uri: "https://assets.customerglu.com/demo/nudges/banner-2.png" }} // Replace with your image URL
                style={styles.bannerImage}
                onPr
              />
              </TouchableOpacity>
            </View>
            <Tags />
          </>
        }
        data={products}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard
            item={item}
            handleProductClick={handleProductDetails}
            toggleFavorite={toggleFavorite}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
      <View>
        {/* <Text>HomeScreen</Text>
        <Text>HomeScreen</Text> */}
      </View>
    </LinearGradient>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },

  headingText: {
    fontSize: 28,
    color: "#000000",
    marginVertical: 20,
    fontFamily: "Poppins-Regular",
  },
  inputContainer: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    height: 48,
    borderRadius: 12,
    alignItems: "center",
    flexDirection: "row",
  },
  searchIcon: {
    height: 26,
    width: 26,
    marginHorizontal: 12,
  },
  textInput: {
    fontSize: 18,
    fontFamily: "Poppins-Regular",
  },
  bannerImage: {
    width: '100%',
    height: 150,
    resizeMode: 'cover', // Ensures the image covers the full width and maintains its aspect ratio
    marginVertical: 20,
  },
});
