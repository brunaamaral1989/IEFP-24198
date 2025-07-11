import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useAuth } from "../context/AuthContext";
import * as ImagePicker from "expo-image-picker";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebaseConfig"; // ou onde você inicializa o Firebase

export default function ProfileScreen() {
  const { user, logout } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState(user?.photoURL);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (uri: string) => {
    try {
      setUploading(true);
      const response = await fetch(uri);
      const blob = await response.blob();

      const storage = getStorage();
      const imageRef = ref(storage, `profileImages/${user.uid}.jpg`);

      await uploadBytes(imageRef, blob);

      const downloadURL = await getDownloadURL(imageRef);

      // Atualiza o perfil do usuário
      await updateProfile(auth.currentUser, {
        photoURL: downloadURL,
      });

      setImageUrl(downloadURL);
      Alert.alert("Sucesso", "Imagem de perfil atualizada!");
    } catch (error) {
      console.error("Erro ao enviar imagem:", error);
      Alert.alert("Erro", "Não foi possível atualizar a imagem.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <LinearGradient colors={["#6a11cb", "#2575fc"]} style={styles.gradient}>
      <View style={styles.container}>
        <Text style={styles.title}>Perfil</Text>

        {user ? (
          <>
            <TouchableOpacity onPress={pickImage}>
              <Image
                source={
                  imageUrl
                    ? { uri: imageUrl }
                    : require("../assets/default-avatar.png")
                }
                style={styles.profileImage}
              />
              <Text style={styles.editImageText}>Alterar foto</Text>
            </TouchableOpacity>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Email:</Text>
              <Text style={styles.value}>{user.email}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>UID:</Text>
              <Text style={styles.value}>{user.uid}</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={logout}>
              <Text style={styles.buttonText}>Sair</Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.loadingText}>Carregando dados do usuário...</Text>
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 32,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
    borderWidth: 3,
    borderColor: "#fff",
  },
  editImageText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
    marginBottom: 24,
    textDecorationLine: "underline",
  },
  infoBox: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    width: "100%",
  },
  label: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 4,
  },
  value: {
    color: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#ff5252",
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 12,
    marginTop: 24,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  loadingText: {
    color: "#fff",
    fontSize: 16,
  },
});

