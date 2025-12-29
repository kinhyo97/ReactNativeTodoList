// src/app/settings/privacy.tsx
import { View, Text, Pressable, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createStyles } from "./private.style";

export default function PrivacyPolicyScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Pressable
          onPress={() => router.back()}
          hitSlop={10}
          style={({ pressed }) => [
            styles.backButton,
            { opacity: pressed ? 0.5 : 1 },
          ]}
        >
          <Ionicons name="chevron-back" size={28} color={theme.text.primary} />
        </Pressable>

        <Text style={styles.title}>개인정보 처리방침</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>하루로그 개인정보처리방침</Text>
        <Text style={styles.sectionDesc}>시행일: 2025-12-29</Text>

        <Text style={styles.articleText}>
          하루로그(이하 “서비스”)는 개인정보보호법 등 관련 법령을 준수하며, 이용자의
          개인정보를 보호하기 위해 다음과 같은 개인정보처리방침을 수립·공개합니다.
        </Text>

        <Text style={styles.articleTitle}>1. 수집하는 개인정보 항목</Text>
        <Text style={styles.articleText}>
          서비스는 회원가입, 로그인 및 서비스 제공을 위해 아래 정보를 수집할 수 있습니다.
        </Text>

        <Text style={styles.articleSubtitle}>1) 필수 수집 항목</Text>
        <Text style={styles.articleText}>
          - 이메일 주소{"\n"}
          - 로그인 식별 정보(계정 식별자){"\n"}
          - 인증 토큰(접속을 위한 토큰 정보)
        </Text>

        <Text style={styles.articleSubtitle}>2) 소셜 로그인(구글) 이용 시 수집 항목</Text>
        <Text style={styles.articleText}>
          - Google 계정 이메일{"\n"}
          - Google 사용자 식별자(구글에서 제공하는 고유 ID){"\n"}
          - (서비스 설정에 따라) 프로필 기본 정보(예: 이름) — 제공되는 경우에만
        </Text>

        <Text style={styles.articleSubtitle}>3) 서비스 이용 과정에서 생성·저장되는 정보(이용자 콘텐츠)</Text>
        <Text style={styles.articleText}>
          - Todo(제목, 날짜, 완료 여부, 메모/설명, 알림 시간 등){"\n"}
          - 카테고리(이름, 색상){"\n"}
          - 기념일(제목, 월/일, 색상)
        </Text>

        <Text style={styles.articleSubtitle}>4) 자동 수집 정보(선택)</Text>
        <Text style={styles.articleText}>
          - 앱 이용 기록(오류 로그, 접속 시간 등){"\n"}
          - 기기/환경 정보(운영체제 버전, 앱 버전 등){"\n"}
          {"\n"}
          단, 서비스는 원칙적으로 이용자를 직접 식별하는 기기 고유식별번호를 수집하지 않으며,
          문제 해결을 위한 최소한의 로그만 활용합니다.
        </Text>

        <Text style={styles.articleTitle}>2. 개인정보 수집 및 이용 목적</Text>
        <Text style={styles.articleText}>
          서비스는 다음 목적을 위해 개인정보를 처리합니다.{"\n"}
          - 회원가입 및 로그인(이메일/구글 로그인) 처리, 본인 식별 및 인증{"\n"}
          - Todo/카테고리/기념일 저장 및 동기화 등 서비스 제공{"\n"}
          - 서비스 운영, 고객 문의 대응 및 공지 전달{"\n"}
          - 오류 분석, 품질 개선 및 보안 대응(부정 이용 방지 등)
        </Text>

        <Text style={styles.articleTitle}>3. 개인정보의 보관 및 이용 기간</Text>
        <Text style={styles.articleText}>
          1) 서비스는 원칙적으로 개인정보 수집 및 이용 목적이 달성되면 지체 없이 파기합니다.{"\n"}
          2) 이용자가 회원 탈퇴(계정 삭제)를 요청하는 경우, 관련 법령 또는 내부 정책에 따라 필요한
          범위를 제외하고 지체 없이 삭제합니다.{"\n"}
          3) 기술적·운영상 필요에 따라 백업 데이터가 일정 기간 존재할 수 있으며, 가능한 범위 내에서
          안전하게 관리 후 삭제합니다.
        </Text>

        <Text style={styles.articleTitle}>4. 개인정보의 제3자 제공</Text>
        <Text style={styles.articleText}>
          서비스는 이용자의 개인정보를 원칙적으로 제3자에게 제공하지 않습니다.{"\n"}
          다만, 법령에 따라 적법한 절차로 요청이 있는 경우에는 예외로 할 수 있습니다.
        </Text>

        <Text style={styles.articleTitle}>5. 개인정보 처리의 위탁</Text>
        <Text style={styles.articleText}>
          서비스는 원활한 서비스 제공을 위해 개인정보 처리를 외부에 위탁할 수 있습니다.{"\n"}
          예: 클라우드/호스팅, 데이터베이스 운영, 로그/오류 분석, 이메일 전송, 소셜 로그인 제공(구글) 등{"\n"}
          {"\n"}
          위탁이 발생하는 경우 서비스는 관련 법령에 따라 위탁 계약을 체결하고, 개인정보가 안전하게 처리되도록
          필요한 사항을 규정·관리합니다.
        </Text>

        <Text style={styles.articleTitle}>6. 이용자의 권리와 행사 방법</Text>
        <Text style={styles.articleText}>
          이용자는 관련 법령에 따라 다음 권리를 행사할 수 있습니다.{"\n"}
          - 개인정보 열람, 정정, 삭제, 처리정지 요청{"\n"}
          - 계정 삭제(회원탈퇴) 요청{"\n"}
          {"\n"}
          권리 행사는 서비스 내 제공되는 기능 또는 문의 채널을 통해 요청할 수 있습니다.
        </Text>

        <Text style={styles.articleTitle}>7. 개인정보의 안전성 확보 조치</Text>
        <Text style={styles.articleText}>
          서비스는 개인정보의 안전성을 확보하기 위해 다음과 같은 조치를 적용할 수 있습니다.{"\n"}
          - 접근 권한 관리 및 최소 권한 원칙 적용{"\n"}
          - 비밀번호 등 민감 정보의 암호화 저장(해시 처리){"\n"}
          - 통신 구간 암호화(HTTPS 등){"\n"}
          - 보안 업데이트 및 취약점 점검{"\n"}
          - 로그/접속 기록 관리
        </Text>

        <Text style={styles.articleTitle}>8. 쿠키 및 유사 기술의 사용</Text>
        <Text style={styles.articleText}>
          서비스는 인증 및 보안 목적을 위해 토큰을 사용할 수 있습니다.{"\n"}
          웹 환경에서 쿠키가 사용될 수 있으며, 앱 환경에서는 기기 저장소(예: Secure Storage 등)에 저장될 수 있습니다.
        </Text>

        <Text style={styles.articleTitle}>9. 개인정보 처리방침 변경</Text>
        <Text style={styles.articleText}>
          본 개인정보처리방침은 법령 또는 서비스 정책 변경에 따라 변경될 수 있으며, 변경 시 서비스 내 공지합니다.
        </Text>

        <Text style={styles.articleTitle}>10. 문의</Text>
        <Text style={styles.articleText}>
          개인정보 관련 문의는 앱 내 안내된 방법을 통해 접수할 수 있습니다.
        </Text>
      </ScrollView>
    </View>
  );
}