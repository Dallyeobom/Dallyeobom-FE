import { marketingConsentTerms } from '@/utils/agreement-detail';
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

interface PushServiceListProps {
  setAgreementDetailNumber: React.Dispatch<React.SetStateAction<number | null>>;
}

function PushServiceList({ setAgreementDetailNumber }: PushServiceListProps) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <TouchableOpacity
        style={styles.header}
        onPress={() => {
          setAgreementDetailNumber(null);
        }}
      >
        <Image source={require('@/assets/images/back.png')} />
        <Text style={styles.headerTitle}>혜택 정보 앱 푸시 알림 수신</Text>
      </TouchableOpacity>
      <ScrollView style={styles.wrapper}>
        {marketingConsentTerms.map((term, index) => {
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

export default PushServiceList;

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
