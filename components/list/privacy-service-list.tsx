import { termsOfPrivacy } from '@/utils/agreement-detail';
import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface PrivacyServiceListProps {
  setAgreementDetailNumber: React.Dispatch<React.SetStateAction<number | null>>;
}

function PrivacyServiceList({ setAgreementDetailNumber }: PrivacyServiceListProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          setAgreementDetailNumber(null);
        }}
      >
        <Image source={require('@/assets/images/back.png')} />
        <Text style={styles.headerTitle}>개인정보 수집 및 이용 동의</Text>
      </TouchableOpacity>

      <ScrollView style={styles.wrapper}>
        {termsOfPrivacy.map((term, index) => {
          return (
            <View
              key={index}
              style={styles.term}
            >
              <Text style={styles.title}>{term.title}</Text>
              <Text style={styles.body}>{term.body}</Text>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

export default PrivacyServiceList;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingHorizontal: 16,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 24,
    columnGap: 90,
    paddingVertical: 10,
  },
  headerTitle: {
    fontWeight: 700,
  },

  wrapper: {
    flex: 1,
    paddingBottom: 40,
  },
  term: {
    marginBottom: 20,
    display: 'flex',
  },
  title: {
    fontWeight: 700,
    marginBottom: 6,
  },

  body: {
    fontSize: 16,
  },
});
