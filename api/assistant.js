import OpenAI from "openai";
import express from "express";
import cors from "cors";
import { MongoClient } from "mongodb";
import dotenv from 'dotenv';
dotenv.config();


const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const ASSISTANT_ID = process.env.ASSISTANT_ID;
const uri = process.env.MONGODB_URI;

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
  });

  //MongoDB 셋업
const client = new MongoClient(uri);

let db; // 데이터베이스 저장 변수 선언

//MongoDB 실행
async function run() {
  try {
    await client.connect();
    db = client.db("openAiChatbot");
    console.log("Connected to MongoDB");
  } catch (err) {
     console.error("Failed to connect to MongoDB", err);
     process.exit(1);
  }
}

// Express 셋업
const app = express()
app.use(cors())
app.use(express.json()) // JSON파일을 Parsing하기 위한 미들웨어

let pollingInterval;

// Thread 생성
// 메세지를 넣기위한 Thread 생성
async function createThread() {
    console.log("Creating a new thread...");
    const thread = await openai.beta.threads.create();
    console.log(thread);
    return thread;
}

// 메시지 추가
// 각 스레드에 사용자 메세지 추가
// 마지막에 response 반환
async function addMessage(threadId, message) {
    console.log("Adding a new message to thread: " + threadId);
    const response = await openai.beta.threads.messages.create(threadId, {
        role: "user",
        content: message,
    })
    return response;
}

// 어시스턴트 실행
// 지정된 스레드에서 어시스턴트 실행, 그리고 응답 반환
async function runAssistant(threadId) {
    console.log("Running assistant for thread: " + threadId);
    const response = await openai.beta.threads.runs.create(threadId, {
        assistant_id: ASSISTANT_ID
    });

    console.log(response);

    return response;
}

// MongoDB에 응답 저장
async function saveResponse(messages, userIP) {
    const collection = db.collection("responses");
    const timestamp = new Date();

    const document = {
        messages: messages,
        userIP: userIP,
        timestamp: timestamp
    };

    await collection.insertOne(document);
    console.log("Response saved to MongoDB");
}

// 스레드 실행 상태 확인
// 완료 상태라면 체크를 멈추고 스레드안 메시지를 가져와 리턴시켜준다.
async function checkingStatus(res, threadId, runId, userIP, userMessage) {
    const runObject = await openai.beta.threads.runs.retrieve(threadId, runId);

    const status = runObject.status;
    console.log(runObject);
    console.log("Current status: " + status);

    if (status == "completed") {
        clearInterval(pollingInterval);

        const messageList = await openai.beta.threads.messages.list(threadId);
        let messages = [];

        messageList.body.data.forEach((message) => {
            messages.push({
              type: message.role === "user" ? "user" : "bot",
              content: message.content
            })
        });

        // MongoDb에 응답 저장
        await saveResponse([...messages], userIP);
        res.json({ messages });
    }
}

// node.js 서버

// 새로운 스레드 생성하고 id 리턴
app.get("/thread", (req, res) => {
    createThread().then((thread) => {
        res.json({ threadId: thread.id });
    });
});

// 본문에서 메세지랑 스레드 id받아서 메세지를 추가하고 어시스턴트 실행, 계속해서 5초마다 상태 체크 후 완료면 메세지 반환
app.post("/message", (req, res) => {
    const { message, threadId } = req.body;
    const userIP = req.ip;

    addMessage(threadId, message).then(() => {
      // res.json({ messageId: message.id });
  
      // 어시스턴트 실행
      runAssistant(threadId).then((run) => {
        const runId = run.id;
  
        // 상태 체크
        pollingInterval = setInterval(() => {
          checkingStatus(res, threadId, runId, userIP, message);
        }, 5000);
      });
    });
  });

// 서버 실행
await run();
app.listen(3001, () => {
    console.log("server started")
})
