# mini‑vault

一个完整的 React Native Web3 钱包示例项目，支持助记词生成/导入、账户管理、本地加密存储、链上交互、转账签名等核心功能。适合作为学习、二次开发或商业级钱包的基础架构。

---

## 🚀 项目简介
mini‑vault 是一个轻量级的、可扩展的 **React Native Web3 钱包模板**，基于 **React Native 0.81+** 与 **TypeScript** 构建。主要用于演示如何在移动端实现：

- 钱包账户体系（助记词 → 私钥 → 地址）
- 链上查询、转账与签名
- 本地加密存储
- UI/UX 钱包流程
- 网络环境切换

该项目结构清晰，非常适合用作你自己的钱包 App 的起点。

---

## ✨ 功能特性
- ✅ 助记词生成（BIP39）
- ✅ 助记词导入恢复钱包
- ✅ 私钥/助记词加密存储
- ✅ 地址派生（支持 BIP44 路径）
- ✅ EVM 链交互（ethers.js）
- ✅ 查询余额
- ✅ 发起链上转账
- ✅ 交易签名 & 广播
- ✅ 基于 Zustand 的全局状态管理
- ✅ 现代化 RN UI 结构（可无缝升级）

---

## 📦 技术栈
- **React Native 0.81+**
- **TypeScript**
- **ethers.js v6** (链上交互)
- **Zustand** (状态管理)
- **AsyncStorage / Keychain**（敏感数据存储）
- **React Navigation**（路由）
- Tailwind 风格 UI 可选

---

## 📂 项目结构
```
mini-vault/
├── src/
│   ├── components/        # UI 组件
│   ├── screens/           # 钱包页面（创建钱包/导入/首页等）
│   ├── navigation/        # 路由结构
│   ├── services/
│   │   ├── wallet/        # 钱包核心逻辑（助记词/派生/私钥）
│   │   ├── chain/         # 链上 RPC、余额、转账等
│   │   ├── storage/       # 本地存储封装
│   ├── store/             # 全局状态（Zustand）
│   └── utils/             # 工具函数
├── ios/
├── android/
└── README.md
```

---

## 🛠️ 安装与运行
### 1. 克隆项目
```bash
git clone https://github.com/aaronzyf/mini-vault.git
cd mini-vault
```

### 2. 安装依赖
```bash
yarn install
```

### 3. iOS 初始化
```bash
cd ios && pod install && cd ..
```

### 4. 启动项目
#### Android
```bash
yarn android
```

#### iOS
```bash
yarn ios
```

---

## 🔑 助记词 & 钱包创建
项目使用 **ethers.js** 生成助记词：
```ts
import { Wallet, Mnemonic } from 'ethers';

const mnemonic = Mnemonic.fromEntropy();
const wallet = Wallet.fromPhrase(mnemonic.phrase);
```

支持恢复钱包：
```ts
const wallet = Wallet.fromPhrase(userInputMnemonic);
```

---

## 🔐 本地加密存储
可选：
- **AsyncStorage（默认）**
- **react-native-keychain（更安全）**

存储示例：
```ts
await AsyncStorage.setItem('vault', encryptedData);
```

---

## 🔗 链上操作
### 查询余额
```ts
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider(RPC_URL);
const balance = await provider.getBalance(address);
```

### 发送交易
```ts
const signer = wallet.connect(provider);

await signer.sendTransaction({
  to: receiver,
  value: ethers.parseEther('0.01'),
});
```

---

## 🧩 环境变量
你可以在 `.env` 中配置 RPC：
```
RPC_MAINNET=
RPC_TESTNET=
```

---

## ✅ 计划与 Roadmap
- [ ] WalletConnect 支持
- [ ] 多链（Polygon / BSC / Arbitrum）
- [ ] Token 与 NFT 资产展示
- [ ] 离线签名
- [ ] UI 主题 & 动效
- [ ] 合约交互（Swap / 质押）

---

## 📱 截图 (可自行替换)
你可以在此处放置项目截图：
```
assets/
 ├── home.png
 ├── create-wallet.png
 └── send.png
```

---

## 🤝 贡献
欢迎提交 PR / Issue 来帮助改进 mini‑vault。

---

## 📄 License
MIT

