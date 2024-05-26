#! /usr/bin/env node

import inquirer from "inquirer";

class User {
  name: string;
  email: string;
  password: any;
  score: number[] = [];
  constructor(name: string, email: string, password: any) {
    (this.name = name), (this.email = email), (this.password = password);
  }

  getscore(score: number) {
    this.score.push(score);
  }

  viewScore() {
    console.log(this.score);
  }
}

let users: User[] = [];

const welcome = () => {
  return new Promise((res) => {
    setTimeout(res, 4000);
  });
};

const wait = () => {
  return new Promise((res) => {
    setTimeout(res, 6000);
  });
};

async function greetUser() {
  console.log(
    "Welcome to our typing speed tester! Ready to see how fast you can type?"
  );

  await welcome();
}
async function mainfunc1() {
  // let continueProgram = true;
  // CONTINUE:
  // while (continueProgram) {
  const options = await inquirer.prompt([
    {
      type: "list",
      name: "userSelectedOptions",
      message: "What would you like to do?",
      choices: ["SignUp", "Login"],
    },
  ]);

  const { userSelectedOptions } = options;

  if (userSelectedOptions == "SignUp") {
    await signUp();
  }

  if (userSelectedOptions == "Login") {
    await logIn();
  }

  // if (userSelectedOptions == "Exit") {
  //   continueProgram = false;
  //   break;
  // }
}
// }

greetUser();
// mainfunc1()

async function signUp() {
  console.log("SignUp for continue");

  const userInfo = await inquirer.prompt([
    {
      type: "string",
      name: "userName",
      message: "Enter Your name : ",
    },
    {
      type: "string",
      name: "userEmail",
      message: "Enter Your email : ",
    },
    {
      type: "password",
      name: "userPassword",
      message: "Enter Your password : ",
      mask: "*",
      validate: function (input: string) {
        if (input.length < 8) {
          console.log("\nPassword must be at least 8 character");
          return false;
        }
        return true;
      },
    },
  ]);

  const { userName, userEmail, userPassword } = userInfo;
  if (userEmail && userName && userPassword) {
    const user = new User(userName, userEmail, userPassword);
    users.push(user);
    console.log("Sign Up successfully!");
  } else {
    console.log("Please enter complete information!");
  }
}

async function logIn() {
  const userAns = await inquirer.prompt([
    {
      type: "string",
      name: "userEmail",
      message: "Enter your email :",
    },
    {
      type: "password",
      name: "userPassword",
      message: "Enter your password:",
      mask: "*",
      validate: function (input: string) {
        if (input.length < 8) {
          console.log("\nPassword must be at least 8 character");
          return false;
        }
        return true;
      },
    },
  ]);

  const { userEmail, userPassword } = userAns;

  let findIndexOfUser = users.findIndex((user) => user.email == userEmail);

  if (findIndexOfUser !== -1) {
    let isInclude =
      users[findIndexOfUser].email.includes(userEmail) &&
      users[findIndexOfUser].password.includes(userPassword);

    if (isInclude) {
      console.log("Successfully Login!");
      await mainFunc();
    } else {
      console.log("failed to login!");
    }
  } else {
    console.log("Login failed!");
  }
}

async function mainFunc() {
  let running = true;
  while (running) {
    const opt = await inquirer.prompt([
      {
        type: "list",
        name: "option",
        message: "what would you like to do?",
        choices: ["Start test", "View Score", "Exit"],
      },
    ]);

    const { option } = opt;

    if (option == "Start test") {
      const options = await inquirer.prompt([
        {
          type: "list",
          name: "difficultyLevel",
          message: "Select the difficulty level.",
          choices: ["easy", "medium", "hard"],
        },
        {
          type: "list",
          name: "timer",
          message: "Enter the timer in minutes:",
          choices: [1, 2, 3],
        },
      ]);
      const { timer, difficultyLevel } = options;
      console.clear();

      async function greet(text: string) {
        console.log(text);
        await wait();
      }

      const wantstostart = await inquirer.prompt([
        {
          type: "confirm",
          name: "start",
          message: "Do you want to start your test",
        },
      ]);
      const { start } = wantstostart;
      if (start == true) {
        if (timer == 1 && difficultyLevel == "easy") {
          await greet(`Get ready to test your typing skills! This is the easy level with a 1-minute time limit.
Time to show off those fingers! You'll have 1 minute to type the following sentence as fast and accurately as possible.

Introduction:
Type the following sentence exactly as you see it:
Focus on both speed and accuracy. We'll measure your WPM (words per minute) at the end.

`);

          let text = "The quick brown fox jumps over the lazy dog";
          console.log(`  ----------------- Text ------------------ `);

          await startTest(1, text);
        }
      }

      if (timer == 2 && difficultyLevel == "easy") {
        await greet(`Warm up those fingers! This is the easy level with a 2-minute time limit to test your typing speed,
  Ready to cruise through some typing practice? You've got 2 minutes to conquer this easy passage and see your WPM soar.`);

        let text =
          "Many people dream of traveling the world, experiencing different cultures, and seeing breathtaking sights. Whether you're drawn to bustling cities, serene beaches, or majestic mountains, there's a perfect destination out there waiting to be explored. So start planning your dream adventure today - the world awaits!";

        console.log(`  ----------------- Text ------------------ `);
        // console.log(text)

        await startTest(2, text);
      }

      if (timer == 3 && difficultyLevel == "easy") {
        await greet(`Take a deep breath and prepare to fly! This is the easy level with a 3-minute time limit to truly stretch your typing wings.
  Feeling confident? This easy level passage will give you 3 minutes to showcase your typing skills and see your WPM climb new heights.
  
  Instuctions:
  Read through the following passage carefully. Once ready, type it as accurately and quickly as possible within the 3-minute time limit. We'll calculate your WPM (words per minute) after the test.
  Don't worry about memorizing the passage. Take a few seconds to get comfortable before you start typing. Remember, both speed and accuracy count!
  
  `);

        let text =
          "n a cozy bookstore nestled amidst bustling city streets, stories come alive on countless shelves. Each book holds a universe waiting to be discovered, filled with adventures, knowledge, and characters that spark our imagination. Whether you're seeking a thrilling mystery, a heartwarming romance, or a captivating historical tale, a bookstore is a haven for bibliophiles of all ages. So, lose yourself in the magic of words and explore the endless possibilities within a bookstore's walls.";

        console.log(`  ----------------- Text ------------------ `);

        await startTest(3, text);
      }

      if (timer == 1 && difficultyLevel == "medium") {
        await greet(`Ready to step up the challenge? This is the medium level, where things get a bit trickier. You'll have 1 minute to test your typing skills.
  Time to put your fingers to the test! The medium level awaits with a 1-minute timer. Can you maintain both speed and accuracy under pressure?
  
  
  Instructions:

The following passage introduces some complexity. Type it as accurately and quickly as possible. We'll measure your WPM (words per minute) at the end of 1 minute.
Remember, accuracy is just as important as speed in this medium level test.
  
  
  `);

        let text =
          "Throughout history, technological advancements have revolutionized the way we live, work, and communicate. From the invention of the printing press to the rise of the internet, technology has constantly pushed boundaries and transformed our world. As we continue to innovate, it's crucial to consider the ethical implications of these advancements and ensure they benefit humanity as a whole";

        console.log(`  ----------------- Text ------------------ `);

        await startTest(3, text);
      }

      if (timer == 2 && difficultyLevel == "medium") {
        await greet(`\n\tLevel up! This is the medium level, designed to test your typing reflexes over 2 minutes. Get ready for a bit more challenge.
    Ready to take it up a notch? The medium level test awaits with a 2-minute timer. Can you handle the increased complexity while maintaining speed?
    
    Instruction:The following passage will test your typing skills with slightly more complex sentence structure and vocabulary. Type it as accurately and quickly as possible within the 2-minute time limit. We'll calculate your WPM (words per minute) after the test.
    Don't be afraid to take a quick glance back at the passage if needed for accuracy in this medium level challenge.
    
    
    \n\t`);

        let text =
          "Effective teamwork is essential for achieving success in many aspects of life. By combining diverse perspectives, skills, and experiences, teams can tackle complex challenges and generate innovative solutions. Strong communication, collaboration, and mutual respect are all key ingredients to fostering a productive and positive team environment. When individuals come together with a shared goal, teamwork can truly unlock remarkable potential.";

        console.log(`  ----------------- Text ------------------ `);

        await startTest(3, text);
      }

      if (timer == 3 && difficultyLevel == "medium") {
        await greet(`Dive deeper into the medium level! This 3-minute test will push your typing skills with more complex sentences and vocabulary.
      Ready to conquer the medium level for 3 minutes? Get set to encounter more intricate sentence structures and a wider range of words to test your typing prowess.
      
      Instruction:The following passage features a step-up in complexity. Type it as accurately and quickly as possible within the 3-minute time limit. We'll calculate your WPM (words per minute) after the test.
      This is your chance to refine your focus and maintain accuracy while typing at a steady pace. Don't hesitate to take a quick glance back if needed for a more polished performance.
      
      
      
      `);

        let text =
          "While artificial intelligence (AI) has the potential to revolutionize various industries and aspects of our lives, ethical considerations must be addressed to ensure its responsible development and implementation. AI algorithms can perpetuate biases if not carefully designed and trained on unbiased data sets. Furthermore, the increasing automation of jobs necessitates proactive measures to ensure a smooth transition for the workforce and minimize job displacement. Open discussions and collaboration between experts, policymakers, and the public are crucial to harnessing the power of AI for the benefit of all";

        console.log(`  ----------------- Text ------------------ `);

        await startTest(3, text);
      }

      if (timer == 1 && difficultyLevel == "hard") {
        await greet(`Buckle up for the ultimate challenge! This is the hard level, designed to test your typing mastery in just 1 minute.
        Ready to push your limits? The hard level awaits with a 1-minute timer. Can you navigate complex sentences and diverse vocabulary at lightning speed?
        
        Introduction:The following passage will truly test your typing skills with intricate sentence structures, diverse vocabulary, and potentially unfamiliar terms. Aim for both speed and accuracy within the 1-minute time limit. We'll calculate your WPM (words per minute) after the test.
        This is a true test of your typing prowess. Don't get discouraged if you don't catch every word - focus on maintaining a good pace with the understanding there might be some errors.
        
        `);

        let text =
          "While the burgeoning field of biomimicry seeks to emulate nature's ingenious designs to solve complex problems, the intricate dance between sustainability and economic viability remains a critical consideration. Mimicking the remarkable efficiency of photosynthesis for renewable energy generation or replicating the gecko's adhesive properties for innovative climbing technologies are just a few examples of biomimicry's potential. However, translating these bio-inspired solutions into commercially viable products requires careful cost-benefit analysis and responsible resource management to ensure long-term sustainability";

        console.log(`  ----------------- Text ------------------ `);

        await startTest(1, text);
      }

      if (timer == 3 && difficultyLevel == "hard") {
        await greet(`
 Brace yourself for the ultimate typing challenge! This is the hard level, where you'll encounter intricate sentences and a vast vocabulary for 3 minutes.
Ready to push your typing skills to the limit? The hard level awaits with a 3-minute timer. Can you navigate complex structures and a wider range of words at high speed for an extended period?
          
 Introduction: The following passage is designed to truly test your typing prowess. Expect intricate sentence structures, diverse vocabulary, and potentially unfamiliar terms. Aim for a balance between speed and accuracy within the 3-minute time limit. We'll calculate your WPM (words per minute) after the test.
 This is your opportunity to showcase your mastery of typing. Focus on maintaining a steady pace while striving for accuracy, but don't be discouraged if you encounter new words. Take brief glances back if needed to ensure a polished performance.  
`);

        let text =
          "The field of quantum mechanics delves into the bizarre and fascinating realm of the subatomic world. Unlike classical mechanics, which governs the behavior of macroscopic objects, quantum mechanics describes the probabilistic nature of particles and their wave-like properties. Concepts like superposition, entanglement, and the uncertainty principle challenge our classical understanding of reality. Understanding quantum mechanics is crucial for developing cutting-edge technologies like lasers, transistors, and even potentially achieving breakthroughs in fields like medicine and materials science. However, the profound implications of quantum mechanics continue to spark philosophical debates about the nature of reality and the limitations of human knowledge";

        console.log(`  ----------------- Text ------------------ `);
        console.log(text);

        await startTest(3, text);
      }

      if (timer == 2 && difficultyLevel == "hard") {
        await greet(`
Prepare to be challenged! This is the hard level, where you'll face intricate sentences and diverse vocabulary for 2 minutes.
Ready to test your typing mettle? The hard level awaits with a 2-minute timer. 
Can you navigate complex structures and a wider range of words at high speed?

Introduction:
The following passage will put your typing skills to the ultimate test with intricate sentence structures, a diverse vocabulary, and potentially unfamiliar terms. Aim for both speed and accuracy within the 2-minute time limit. We'll calculate your WPM (words per minute) after the test.
This is your chance to showcase your advanced typing abilities. Focus on maintaining a good pace while striving for accuracy, but don't be discouraged if you encounter unfamiliar words.
            
            `);

        let text =
          "The burgeoning field of astrobiology seeks to answer the profound question: Are we alone in the universe? Scientists explore the possibility of extraterrestrial life by investigating the potential for habitable exoplanets and analyzing the chemical composition of celestial bodies. From studying extremophiles thriving in Earth's harshest environments to searching for biosignatures on distant planets, astrobiology ignites our curiosity about the potential for life beyond our own world. This interdisciplinary field requires expertise in astronomy, biology, chemistry, and geology, ultimately aiming to unravel one of humanity's most enduring mysteriespen_spark";

        console.log(`  ----------------- Text ------------------ `);
        console.log(text);

        await startTest(2, text);
      }
    }

    if (option == "View Score") {
      const viewScore = await inquirer.prompt([
        {
          type: "confirm",
          name: "score",
          message: "Do you want to view your score?",
        },
      ]);

      const { score } = viewScore;

      if (score == true) {
        const getname = await inquirer.prompt([
          {
            type: "string",
            name: "username",
            message: "Please enter your name?",
          },
        ]);
        const { username } = getname;

        const findIndexOfuser = users.findIndex(
          (user) => user.name == username
        );
        users[findIndexOfuser].viewScore();
      }
    }

    if (option == "Exit") {
      const exit = await inquirer.prompt([
        {
          type: "confirm",
          name: "exitProgram",
          message: "Do you want to exit?",
        },
      ]);
      const { exitProgram } = exit;
      if (exitProgram == true) {
        running = false;
        break;
      }
    }
  }
}
async function startTest(timer: number, text: string) {
  const name = await inquirer.prompt([
    {
      type: "string",
      name: "userName",
      message: "Enter your name:",
    },
  ]);
  const { userName } = name;
  const findIndex = users.findIndex((user) => user.name == userName);
  console.log(text);
  console.log("Your time starts now .....");
  await time(timer);
  const userAns = await inquirer.prompt([
    {
      type: "string",
      name: "ans",
      message: "\n\tStart writing now : ",
    },
  ]);
  let correctWords = 0;
  let wrongWords = 0;
  users[findIndex].getscore(correctWords);
  const { ans } = userAns;
  let userText: string[] = ans.trim().split(" ");
  let textarr: string[] = text.split(" ");
  // console.log(`You can ${userText.length}words in a min`)
  for (let i = 0; i < userText.length; i++) {
    textarr.forEach((element) => {
      if (userText[i] == element) {
        ++correctWords;
      }
    });
  }

  let mistakes = textarr.length - correctWords;
  if (userText.length == textarr.length && mistakes == 0) {
    console.log("Congratulation ! You passed the test");
    users[findIndex].getscore(correctWords);
  } else {
    console.log("Oops!Try next time.");
  }
  console.log(
    `You can approximately write ${userText.length / timer} words per minute`
  );
  console.log(`You write ${correctWords} correct words.`);
  console.log(`You made ${mistakes} mistakes.`);
}

async function time(timer: number) {
  let futureDate = new Date().setMinutes(new Date().getMinutes() + timer);
  let interval = setInterval(() => {
    let currentdate = Date.now();
    let timeDiff = futureDate - currentdate;
    let minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    let second = Math.floor((timeDiff % (1000 * 60)) / 1000);

    process.stdout.write(
      "\r" +
        `${minutes.toString().padStart(2, "0")}:${second
          .toString()
          .padStart(2, "0")}`
    );

    if (timeDiff <= 0) {
      console.log(`\n\tTime's up! press Enter to see your WPM score.`);
      clearInterval(interval);
    }
  }, 1000);
}

// Type the following sentence exactly as you see it:
// Focus on both speed and accuracy. We'll measure your WPM (words per minute) at the end.

do {
  await mainfunc1();

  var ans = await inquirer.prompt([
    {
      type: "confirm",
      name: "continue",
      message: "Do you want to continue",
    },
  ]);
} while (ans.continue == true);
