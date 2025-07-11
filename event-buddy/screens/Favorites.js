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
import { LinearGradient } from "expo-linear-gradient";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useLayoutEffect } from "react";

export default function FavoritesScreen({ navigation }) {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Favoritos",
    });
  }, [navigation]);

  useFocusEffect(
  useCallback(() => {
    if (!user?.uid) return;

    const fetchFavorites = async () => {
      setLoading(true);

      try {
        const favSnapshot = await database
          .collection("users")
          .doc(user.uid)
          .collection("favorites")
          .get();

        const favIds = favSnapshot.docs.map((doc) => doc.id);

        if (favIds.length === 0) {
          setFavorites([]);
          return;
        }

        const eventSnapshot = await database
          .collection("events")
          .where("__name__", "in", favIds)
          .get();

        const events = eventSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setFavorites(events);
      } catch (error) {
        console.error("Erro ao buscar favoritos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [user?.uid])
);

  if (loading) {
    return (
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      </LinearGradient>
    );
  }

  if (favorites.length === 0) {
    return (
      <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
        <View style={styles.loader}>
          <Text style={styles.emptyText}>Nenhum favorito encontrado.</Text>
        </View>
      </LinearGradient>
    );
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate("EventDetail", { eventId: item.id })}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.image} />
      <View style={styles.info}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>
          {new Date(item.datetime.toDate()).toLocaleString()}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 16 }}
      />
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
    paddingHorizontal: 16,
  },
  emptyText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  card: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 16,
    overflow: "hidden",
    marginBottom: 16,
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    height: 140,
    padding: 12,
    alignItems: "center",
  },
  image: {
    width: 140,
    height: 120,
    borderRadius: 12,
  },
  info: {
    flex: 1,
    paddingLeft: 16,
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
});
