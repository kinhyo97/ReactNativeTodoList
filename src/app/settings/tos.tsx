import { View, Text, Pressable, ScrollView } from "react-native";
import { useTheme } from "@/styles/hooks/useTheme";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { createStyles } from "./tos.style";

export default function TermsOfServiceScreen() {
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

        <Text style={styles.title}>이용약관</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionTitle}>하루로그 이용약관</Text>
        <Text style={styles.sectionDesc}>시행일: 2025-12-29</Text>

        <Text style={styles.articleTitle}>제1조 (목적)</Text>
        <Text style={styles.articleText}>
          본 약관은 하루로그(이하 “서비스”)가 제공하는 일정·할 일(Todo) 관리 및 관련
          기능(카테고리, 알림, 기념일 등)의 이용과 관련하여 서비스와 이용자 간의 권리,
          의무 및 책임사항을 규정함을 목적으로 합니다.
        </Text>

        <Text style={styles.articleTitle}>제2조 (정의)</Text>
        <Text style={styles.articleText}>
          1. “이용자”란 본 약관에 따라 서비스를 이용하는 자를 말합니다.{"\n"}
          2. “계정”이란 서비스 이용을 위해 이용자가 생성하거나 소셜 로그인을 통해
          연동한 식별 정보를 말합니다.{"\n"}
          3. “콘텐츠”란 이용자가 서비스에 입력·저장하는 Todo, 기념일, 카테고리, 메모
          및 기타 데이터 일체를 말합니다.
        </Text>

        <Text style={styles.articleTitle}>제3조 (약관의 효력 및 변경)</Text>
        <Text style={styles.articleText}>
          1. 본 약관은 서비스 내 게시 또는 연결 화면을 통해 공지함으로써 효력이
          발생합니다.{"\n"}
          2. 서비스는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있으며,
          변경 시 적용일 및 변경 사유를 서비스 내 공지합니다.{"\n"}
          3. 이용자가 변경 약관에 동의하지 않는 경우 서비스 이용을 중단하고 회원탈퇴
          (계정 삭제)를 요청할 수 있습니다.
        </Text>

        <Text style={styles.articleTitle}>제4조 (서비스 제공 및 변경)</Text>
        <Text style={styles.articleText}>
          1. 서비스는 다음 기능을 제공합니다.{"\n"}
          - Todo 생성/조회/수정/삭제 및 범위 등록{"\n"}
          - 카테고리 관리{"\n"}
          - 알림(리마인더) 기능{"\n"}
          - 기념일 관리{"\n"}
          - 기타 서비스가 정하는 기능{"\n"}
          2. 서비스는 운영상·기술상 필요에 따라 서비스의 전부 또는 일부를 변경할 수
          있습니다.
        </Text>

        <Text style={styles.articleTitle}>제5조 (회원가입 및 로그인)</Text>
        <Text style={styles.articleText}>
          1. 이용자는 이메일 로그인 또는 Google 로그인 등 서비스가 제공하는 방식으로
          계정을 생성/연동하여 서비스를 이용할 수 있습니다.{"\n"}
          2. 이용자는 계정 정보의 정확성을 유지해야 하며, 타인의 정보를 도용하여서는
          안 됩니다.
        </Text>

        <Text style={styles.articleTitle}>제6조 (이용자의 의무)</Text>
        <Text style={styles.articleText}>
          이용자는 다음 행위를 하여서는 안 됩니다.{"\n"}
          1. 타인의 계정 또는 개인정보를 도용하는 행위{"\n"}
          2. 서비스의 정상 운영을 방해하거나 서버에 과도한 부하를 유발하는 행위{"\n"}
          3. 불법 정보 또는 권리 침해(저작권, 명예훼손 등) 콘텐츠를 게시·전송하는 행위{"\n"}
          4. 법령 및 본 약관을 위반하는 기타 행위
        </Text>

        <Text style={styles.articleTitle}>제7조 (계정 및 보안)</Text>
        <Text style={styles.articleText}>
          1. 이용자는 계정의 비밀번호 및 인증 토큰 등 접근수단을 스스로 관리할 책임이
          있습니다.{"\n"}
          2. 이용자의 관리 소홀로 발생한 손해에 대해 서비스는 법령상 책임이 없는 한
          책임을 지지 않습니다.{"\n"}
          3. 이용자가 계정 도용을 인지한 경우 즉시 비밀번호 변경 및 고객문의 등을 통해
          조치를 요청할 수 있습니다.
        </Text>

        <Text style={styles.articleTitle}>제8조 (이용자 콘텐츠의 권리 및 이용)</Text>
        <Text style={styles.articleText}>
          1. 이용자가 서비스에 입력한 콘텐츠의 권리는 이용자에게 있습니다.{"\n"}
          2. 서비스는 서비스 제공(저장, 동기화, 백업, 표시 등)에 필요한 범위에서
          이용자의 콘텐츠를 처리할 수 있습니다.{"\n"}
          3. 서비스는 이용자의 동의 없이 이용자 콘텐츠를 광고/홍보 목적으로 외부에
          공개하지 않습니다. 단, 법령에 따른 요청이 있는 경우 예외로 합니다.
        </Text>

        <Text style={styles.articleTitle}>제9조 (서비스 이용 제한 및 중지)</Text>
        <Text style={styles.articleText}>
          1. 서비스는 다음 사유가 있는 경우 이용자의 서비스 이용을 제한하거나 중지할 수
          있습니다.{"\n"}
          - 본 약관 또는 법령 위반{"\n"}
          - 비정상적인 트래픽 발생 등 운영 방해{"\n"}
          - 보안상 위험이 확인되는 경우{"\n"}
          2. 이용 제한 또는 중지 시 서비스는 가능한 범위에서 사유를 안내합니다.
        </Text>

        <Text style={styles.articleTitle}>제10조 (데이터 보관 및 삭제)</Text>
        <Text style={styles.articleText}>
          1. 서비스는 이용자에게 서비스 제공을 위해 데이터를 저장할 수 있습니다.{"\n"}
          2. 이용자가 “전체 삭제” 또는 “계정 삭제(탈퇴)”를 수행하면 해당 데이터는
          서비스 정책 및 법령에 따라 처리됩니다.{"\n"}
          3. 서비스는 기술적·운영상 필요에 따라 백업 데이터가 일정 기간 존재할 수 있으나,
          가능한 범위 내에서 안전하게 관리합니다.
        </Text>

        <Text style={styles.articleTitle}>제11조 (면책)</Text>
        <Text style={styles.articleText}>
          1. 서비스는 천재지변, 통신 장애, 시스템 점검 등 불가항력 사유로 서비스를 제공할
          수 없는 경우 책임을 지지 않습니다.{"\n"}
          2. 서비스는 이용자가 입력한 콘텐츠의 정확성, 일정 알림의 도달(기기 설정/OS 정책/
          네트워크 환경 등)에 대해 보증하지 않습니다.{"\n"}
          3. 서비스는 이용자 간 또는 이용자와 제3자 간 분쟁에 개입하지 않으며, 법령상 책임이
          없는 한 책임을 지지 않습니다.
        </Text>

        <Text style={styles.articleTitle}>제12조 (준거법 및 분쟁 해결)</Text>
        <Text style={styles.articleText}>
          본 약관은 대한민국 법령에 따르며, 서비스와 이용자 간 분쟁이 발생할 경우 관할 법원은
          민사소송법 등 관계 법령이 정하는 바에 따릅니다.
        </Text>

        <Text style={styles.articleTitle}>제13조 (문의)</Text>
        <Text style={styles.articleText}>
          서비스 관련 문의는 앱 내 안내된 방법을 통해 접수할 수 있습니다.
        </Text>
      </ScrollView>
    </View>
  );
}
