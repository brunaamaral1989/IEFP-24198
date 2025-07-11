import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { database } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";

export default function Home({ navigation }) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState([]);


  useFocusEffect(
  useCallback(() => {
    const unsubscribeEvents = database
      .collection("events")
      .orderBy("datetime")
      .onSnapshot(
        (querySnapshot) => {
          const list = [];
          querySnapshot.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setEvents(list);
          setLoading(false);
        },
        (error) => {
          console.error(error);
          setLoading(false);
        }
      );

    const unsubscribeFavorites = database
      .collection("users")
      .doc(user.uid)
      .collection("favorites")
      .onSnapshot((snapshot) => {
        const favIds = snapshot.docs.map((doc) => doc.id);
        setFavoriteIds(favIds);
      });

    return () => {
      unsubscribeEvents();
      unsubscribeFavorites();
    };
  }, [user.uid])
);


const toggleFavorite = async (eventId) => {
  const favRef = database
    .collection("users")
    .doc(user.uid)
    .collection("favorites")
    .doc(eventId);

  const isFav = favoriteIds.includes(eventId);

  try {
    if (isFav) {
      await favRef.delete();
      setFavoriteIds((prev) => prev.filter((id) => id !== eventId)); // remove localmente
    } else {
      await favRef.set({ createdAt: new Date() });
      setFavoriteIds((prev) => [...prev, eventId]); // adiciona localmente
    }
  } catch (error) {
    console.error("Erro ao alternar favorito:", error);
  }
};


  if (loading) {
    return (
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      </LinearGradient>
    );
  }

  const renderEvent = ({ item }) => (
    <View style={styles.card}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() =>
          navigation.navigate("EventDetail", { eventId: item.id })
        }
      >
        <View style={styles.row}>
          <Image source={{ uri: item.imageUrl }} style={styles.image} />
          <View style={styles.info}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>
              {new Date(item.datetime.toDate()).toLocaleString()}
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
  style={styles.favoriteIcon}
  onPress={() => toggleFavorite(item.id)}
>
  <Ionicons
    name={favoriteIds.includes(item.id) ? "heart" : "heart-outline"}
    size={24}
    color="#ff5252"
  />
</TouchableOpacity>

    </View>
  );

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={renderEvent}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={{ alignItems: "center", marginBottom: 24 }}>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)", 
    borderRadius: 16,
    marginBottom: 20,
    overflow: "hidden",
    elevation: 20,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 20},
    position: "relative",
    height: 140,
    padding: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 120,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    padding: 16,
    justifyContent: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  date: {
    fontSize: 14,
    color: "#e0e0e0",
    marginTop: 6,
  },
  favoriteIcon: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 4,
    elevation: 4,
  },
  button: {
    backgroundColor: "#ff5252",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
