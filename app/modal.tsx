import { useLocalSearchParams, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
  website: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
}

export default function ModalScreen() {

  const params = useLocalSearchParams();
  const router = useRouter();

  let user: User | null = null;
  if (params.user && typeof params.user === 'string') {
    user = JSON.parse(params.user);
  }

  if (!user) {
    return (
      <SafeAreaView className='flex flex-1 items-center justify-center bg-white'>
        <Text className='text-lg text-red-500'>Data pengguna tidak ditemukan</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className='flex flex-1 items-center justify-center bg-white p-5'>
      <View className='w-full max-w-sm bg-gray-100 rounded-xl p-6 shadow-lg'>
        <Text className='text-2xl font-bold text-center mb-1 mt-2'>{user.name}</Text>
        <Text className='text-base text-gray-600 text-center mb-3'>{user.email}</Text>
        <View className='border-t border-gray-400 my-4' />
          <Text className='text-sm text-gray-500'>Telephone: </Text>
          <Text className='text-base font-semibold mb-3'>{user.phone}</Text>

          <Text className='text-sm text-gray-500'>alamat: </Text>
          <Text className='text-base font-semibold'>{`${user.address.street}, ${user.address.suite}`}</Text>
          <Text className='text-base font-semibold mb-3'>{`${user.address.city}, ${user.address.zipcode}`}</Text>

          <Text className='text-sm text-gray-500'>Perusahan: </Text>
          <Text className='text-base font-semibold'>{user.company.name}</Text>
        </View>

        <TouchableOpacity onPress={() => router.back()} className='mt-6 bg-blue-500 py-3 px-8 rounded-full'>
          <Text className='text-white font-bold text-lg'>Tutup</Text>
        </TouchableOpacity>
        <StatusBar style='light' />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});