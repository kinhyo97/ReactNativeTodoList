import {
  View,
  Text,
  TextInput,
  Pressable,
  ScrollView,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useMemo, useRef, useState } from "react";
import { useTheme } from "@/styles/hooks/useTheme";
import { createStyles } from "./EmailEntryScreen.style";
import BackButton from "../components/BackButton";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import * as authApi from "@/features/auth/services/auth.api";

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function hasTwoTypes(password: string) {
  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecial = /[^A-Za-z0-9]/.test(password);
  const count = [hasLetter, hasNumber, hasSpecial].filter(Boolean).length;
  return count >= 2;
}

function isLenOkNoSpace(password: string) {
  const noSpace = !/\s/.test(password);
  return password.length >= 8 && password.length <= 32 && noSpace;
}

function hasNoTripleRepeat(password: string) {
  return !/(.)\1\1/.test(password);
}

function RuleItem({
  ok,
  text,
  themeTextTertiary,
}: {
  ok: boolean;
  text: string;
  themeTextTertiary: string;
}) {
  const okColor = "#16a34a";
  const offColor = themeTextTertiary;

  return (
    <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
      <Ionicons
        name={ok ? "checkmark-circle" : "ellipse-outline"}
        size={18}
        color={ok ? okColor : offColor}
      />
      <Text style={{ fontSize: 13, color: ok ? okColor : offColor }}>
        {text}
      </Text>
    </View>
  );
}

export default function EmailEntryScreen() {
  const theme = useTheme();
  const styles = useMemo(() => createStyles(theme), [theme]);

  const emailRef = useRef<TextInput>(null);
  const pwRef = useRef<TextInput>(null);
  const pw2Ref = useRef<TextInput>(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPw, setShowPw] = useState(false);
  const [showPw2, setShowPw2] = useState(false);

  const [agreeMarketing, setAgreeMarketing] = useState(false);

  // 터치/제출 여부
  const [emailTouched, setEmailTouched] = useState(false);
  const [pwTouched, setPwTouched] = useState(false);
  const [pw2Touched, setPw2Touched] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  // 회원가입 버튼 로딩
  const [submitting, setSubmitting] = useState(false);

  // 비번 규칙
  const rule1 = hasTwoTypes(password);
  const rule2 = isLenOkNoSpace(password);
  const rule3 = hasNoTripleRepeat(password);

  // 에러 메시지 계산
  const getEmailError = () => {
    const e = email.trim();
    if (!e) return "이메일을 입력해 주세요.";
    if (!isValidEmail(e)) return "이메일 형식이 올바르지 않습니다.";
    return null;
  };

  const getPasswordError = () => {
    if (!password) return "비밀번호를 입력해 주세요.";
    if (!rule1) return "영문/숫자/특수문자 중 2가지 이상 포함해 주세요.";
    if (!rule2) return "8~32자, 공백 없이 입력해 주세요.";
    if (!rule3) return "동일 문자/숫자 3회 연속은 사용할 수 없습니다.";
    return null;
  };

  const getConfirmError = () => {
    if (!confirmPassword) return "비밀번호 확인을 입력해 주세요.";
    if (password !== confirmPassword) return "비밀번호가 일치하지 않습니다.";
    return null;
  };

  const emailError = getEmailError();
  const pwError = getPasswordError();
  const pw2Error = getConfirmError();

  // 언제 에러 표시할지
  const showEmailError = (emailTouched || submitAttempted) && !!emailError;
  const showPwError = (pwTouched || submitAttempted) && !!pwError;
  const showPw2Error = (pw2Touched || submitAttempted) && !!pw2Error;

  const onSubmit = async () => {
    console.log("onSubmit 실행")
    if (submitting) return;

    setSubmitAttempted(true);

    if (emailError) {
      emailRef.current?.focus();
      return;
    }
    if (pwError) {
      pwRef.current?.focus();
      return;
    }
    if (pw2Error) {
      pw2Ref.current?.focus();
      return;
    }

    // 포커스/키보드 정리
    emailRef.current?.blur();
    pwRef.current?.blur();
    pw2Ref.current?.blur();
    Keyboard.dismiss();

    const e = email.trim().toLowerCase();

    try {
      setSubmitting(true);

      // ✅ 서버 회원가입 + 인증메일 발송
      // agreeMarketing은 서버에서 아직 안 쓰면 일단 무시해도 됨
      console.log("register api")
      await authApi.register(e, password);

      router.push({
        pathname: "/auth/email-sent",
        params: { email: e },
      });
    } catch (err: any) {
      const code = String(err?.message || "UNKNOWN_ERROR");

      if (code === "EMAIL_ALREADY_USED") {
        Alert.alert("가입 불가", "이미 사용 중인 이메일입니다.");
      } else if (code === "EMAIL_REQUIRED") {
        Alert.alert("오류", "이메일을 입력해 주세요.");
      } else if (code === "PASSWORD_REQUIRED") {
        Alert.alert("오류", "비밀번호를 입력해 주세요.");
      } else {
        Alert.alert("회원가입 실패", code);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <BackButton />

      <View style={styles.header}>
        <Text style={styles.title}>회원가입</Text>
        <Text style={styles.subtitle}>하루로그에 오신 것을 환영합니다.</Text>
      </View>

      <View style={styles.form}>
        {/* 이메일 */}
        <Text style={styles.label}>이메일</Text>
        <View
          style={[
            styles.inputWrap,
            showEmailError ? styles.inputWrapError : null,
          ]}
        >
          <TextInput
            ref={emailRef}
            value={email}
            onChangeText={setEmail}
            onBlur={() => setEmailTouched(true)}
            placeholder="이메일 주소"
            placeholderTextColor={theme.text.tertiary}
            autoCapitalize="none"
            keyboardType="email-address"
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => pwRef.current?.focus()}
          />
        </View>
        {showEmailError && <Text style={styles.errorText}>{emailError}</Text>}

        {/* 비밀번호 */}
        <Text style={styles.label}>비밀번호</Text>
        <View
          style={[
            styles.inputWrap,
            showPwError ? styles.inputWrapError : null,
          ]}
        >
          <TextInput
            ref={pwRef}
            value={password}
            onChangeText={setPassword}
            onBlur={() => setPwTouched(true)}
            placeholder="비밀번호"
            placeholderTextColor={theme.text.tertiary}
            secureTextEntry={!showPw}
            autoCapitalize="none"
            style={styles.input}
            returnKeyType="next"
            onSubmitEditing={() => pw2Ref.current?.focus()}
          />
          <Pressable
            style={styles.eyeButton}
            onPress={() => setShowPw((v) => !v)}
            hitSlop={10}
          >
            <Ionicons
              name={showPw ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={theme.text.tertiary}
            />
          </Pressable>
        </View>

        {/* 규칙 체크 */}
        <View style={styles.rules}>
          <RuleItem
            ok={rule1}
            text="영문/숫자/특수문자 중, 2가지 이상 포함"
            themeTextTertiary={theme.text.tertiary}
          />
          <RuleItem
            ok={rule2}
            text="8자 이상 32자 이하 입력 (공백 제외)"
            themeTextTertiary={theme.text.tertiary}
          />
          <RuleItem
            ok={rule3}
            text="연속 3자 이상 동일한 문자/숫자 제외"
            themeTextTertiary={theme.text.tertiary}
          />
        </View>

        {showPwError && <Text style={styles.errorText}>{pwError}</Text>}

        {/* 비밀번호 확인 */}
        <Text style={styles.label}>비밀번호 확인</Text>
        <View
          style={[
            styles.inputWrap,
            showPw2Error ? styles.inputWrapError : null,
          ]}
        >
          <TextInput
            ref={pw2Ref}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onBlur={() => setPw2Touched(true)}
            placeholder="비밀번호 확인"
            placeholderTextColor={theme.text.tertiary}
            secureTextEntry={!showPw2}
            autoCapitalize="none"
            style={styles.input}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
          />
          <Pressable
            style={styles.eyeButton}
            onPress={() => setShowPw2((v) => !v)}
            hitSlop={10}
          >
            <Ionicons
              name={showPw2 ? "eye-off-outline" : "eye-outline"}
              size={20}
              color={theme.text.tertiary}
            />
          </Pressable>
        </View>

        {((pw2Touched || submitAttempted) && confirmPassword.length > 0) && (
          <Text
            style={[
              styles.matchText,
              pw2Error ? styles.matchBad : styles.matchOk,
            ]}
          >
            {pw2Error ? pw2Error : "비밀번호가 일치합니다."}
          </Text>
        )}

        {/* 가입하기 */}
        <Pressable
          style={[styles.submitButton, submitting ? { opacity: 0.6 } : null]}
          onPress={onSubmit}
          disabled={submitting}
        >
          {submitting ? (
            <ActivityIndicator />
          ) : (
            <Text style={styles.submitButtonText}>회원가입</Text>
          )}
        </Pressable>

        {/* 마케팅 수신 동의 (서버에 아직 안 쓰면 UI만 유지) */}
        <Pressable
          style={styles.agreeRow}
          onPress={() => setAgreeMarketing((v) => !v)}
          hitSlop={10}
        >
          <Ionicons
            name={agreeMarketing ? "checkbox" : "square-outline"}
            size={20}
            color={agreeMarketing ? "#16a34a" : theme.text.tertiary}
          />
          <Text style={styles.agreeText}>
            마케팅 및 유용한 소식을 받아보겠습니다.
          </Text>
        </Pressable>

        {/* 간편 회원가입 */}
        {/* <View style={styles.dividerRow}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>간편 회원가입</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.socialRow}>
          <Pressable style={styles.socialButton}>
            <Ionicons name="logo-google" size={22} color={theme.text.primary} />
          </Pressable>
        </View> */}
      </View>
    </ScrollView>
  );
}
