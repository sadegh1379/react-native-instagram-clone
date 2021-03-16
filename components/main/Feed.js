import React, { useState, useEffect } from "react";
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
  Pressable,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useSelector } from "react-redux";
import { Title, Avatar, Caption } from "react-native-paper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Profile = ({ navigation }) => {
  const usersState = useSelector((state) => state.users);
  const userState = useSelector((state) => state.user);

  const [post, setPost] = useState([]);
  useEffect(() => {
    let posts = [];
    if (usersState.usersLoaded == userState.following.length) {
      for (let i = 0; i < userState.following.length; i++) {
        const user = usersState.users.find(
          (el) => el.uid === userState.following[i]
        );
        if (user != undefined) {
          posts = [...posts, ...user.posts];
        }
      }
      posts.sort(function (x, y) {
        return x.creation - y.creation;
      });
      setPost(posts);
    }
  }, [usersState.usersLoaded]);

  console.log(post);

  //   if (loading) {
  //     return (
  //       <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
  //         <ActivityIndicator color="yellow" size={50} />
  //       </View>
  //     );
  //   }
  if (post.length == 0) {
    return (
      <Animatable.View animation="bounceInUp" style={styles.container}>
        <View style={styles.headContainer}>
          <MaterialCommunityIcons name="menu" size={24} />
          <Title style={{ fontWeight: "bold" }}>Instagram</Title>
          <MaterialCommunityIcons name="home" size={24} />
        </View>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontWeight: "bold" }}>No Following Yet</Text>
          <ActivityIndicator color="yellow" size={50} />
        </View>
      </Animatable.View>
    );
  }
  return (
    <Animatable.View animation="bounceInUp" style={styles.container}>
      <View style={styles.headContainer}>
        <MaterialCommunityIcons name="menu" size={24} />
        <Title style={{ fontWeight: "bold" }}>Instagram</Title>
        <MaterialCommunityIcons name="home" size={24} />
      </View>
      <View style={{ flex: 1 }}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={post}
          renderItem={({ item }) => (
            <View
              style={{
                flex: 1,
                margin: 5,
                borderWidth: 1,
                borderColor: "grey",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", { uid: item.user.uid })
                }
              >
                <View
                  style={{
                    padding: 8,
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Avatar.Icon size={30} />
                  <Text
                    style={{ marginLeft: 10, fontSize: 13, fontWeight: "bold" }}
                  >
                    {item.user.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <Image
                style={{ width: "100%", height: 300 }}
                source={{ uri: item.DownloadURL }}
              />
              <View style={{ padding: 10 }}>
                <Text style={{ fontSize: 12, fontWeight: "bold" }}>
                  {item.caption}
                </Text>
              </View>
              <Pressable
                onPress={() =>
                  navigation.navigate("Comments", {
                    uid: item.user.uid,
                    postId: item.id,
                  })
                }
              >
                <Text>View Comments</Text>
              </Pressable>
            </View>
          )}
        />
      </View>
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headContainer: {
    // margin: 10,
    padding: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  bodyContainer: {
    flex: 1,
    margin: 5,
  },
});

export default Profile;
