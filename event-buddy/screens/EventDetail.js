import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Alert,
} from "react-native";
import { database } from "../firebaseConfig";
import { useAuth } from "../context/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";

export default function EventDetail({ route }) {
  const { eventId } = route.params;
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isParticipating, setIsParticipating] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const eventRef = database.collection("events").doc(eventId);
  const favsRef = database
    .collection("users")
    .doc(user.uid)
    .collection("favorites")
    .doc(eventId);

  useEffect(() => {
  const fetchEvent = async () => {
    try {
      const eventRef = database.collection("events").doc(eventId);
      const favsRef = database
        .collection("users")
        .doc(user.uid)
        .collection("favorites")
        .doc(eventId);

      const doc = await eventRef.get();
      if (doc.exists) {
        const data = doc.data();
        setEvent(data);
        setIsParticipating(data.participants?.includes(user.uid) || false);

        const favDoc = await favsRef.get();
        setIsFavorite(favDoc.exists);
      }
    } catch (error) {
      console.error("Erro ao buscar evento:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchEvent();
}, [eventId, user.uid]);


const handleToggleParticipation = async () => {
  const userParticipationRef = database
    .collection("users")
    .doc(user.uid)
    .collection("participations")
    .doc(eventId);

  try {
    const currentParticipants = event.participants || [];

    if (isParticipating) {
      const updatedParticipants = currentParticipants.filter((id) => id !== user.uid);
      await eventRef.update({ participants: updatedParticipants });

      await userParticipationRef.delete();
    } else {
      const updatedParticipants = [...currentParticipants, user.uid];
      await eventRef.update({ participants: updatedParticipants });

      await userParticipationRef.set({ createdAt: new Date() });
    }

    setEvent((prev) => ({
      ...prev,
      participants: isParticipating
        ? prev.participants.filter((id) => id !== user.uid)
        : [...prev.participants || [], user.uid],
    }));

    setIsParticipating(!isParticipating);
  } catch (error) {
    console.error("Erro ao atualizar participação:", error);
    Alert.alert("Erro ao atualizar participação.");
  }
};


  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await favsRef.delete();
      } else {
        await favsRef.set({ createdAt: new Date() });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      Alert.alert("Erro ao atualizar favoritos.");
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6a11cb" />
      </View>
    );
  }

  if (!event) {
    return (
      <View style={styles.container}>
        <Text style={styles.error}>Evento não encontrado.</Text>
      </View>
    );
  }

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
    <ScrollView style={styles.container}>
      <Image source={{ uri: event.imageUrl }} style={styles.image} />

      <View style={styles.content}>
        <View style={styles.headerRow}>
          <Text style={styles.title}>{event.title}</Text>

          <TouchableOpacity onPress={handleToggleFavorite}>
            <Ionicons
              name={isFavorite ? "heart" : "heart-outline"}
              size={28}
              color="#ff5252"
            />
          </TouchableOpacity>
        </View>

        <Text style={styles.label}>Local:</Text>
        <Text style={styles.text}>
          Lat: {event.location.latitude.toFixed(5)}, Lon: {event.location.longitude.toFixed(5)}
        </Text>


        <Text style={styles.label}>Data:</Text>
        <Text style={styles.text}>
          {new Date(event.datetime.toDate()).toLocaleString()}
        </Text>

        <Text style={styles.label}>Descrição:</Text>
        <Text style={styles.text}>{event.description}</Text>

        <Text style={styles.label}>
          Participantes: {event.participants?.length || 0}
        </Text>

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: isParticipating ? "#aaa" : "#4CAF50" },
          ]}
          onPress={handleToggleParticipation}
        >
          <Text style={styles.buttonText}>
            {isParticipating ? "Cancelar participação" : "Participar"}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  error: {
    marginTop: 40,
    textAlign: "center",
    fontSize: 16,
    color: "red",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    flex: 1,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 16,
    color: "#444",
  },
  text: {
    fontSize: 15,
    color: "#666",
    marginTop: 4,
  },
  button: {
    backgroundColor: "#ff5252",
    marginTop: 24,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
