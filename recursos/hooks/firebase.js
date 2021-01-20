import { firebase } from "../utils/firebase";

const db = firebase.firestore();

const saveTokenPhone = async (token, uid) => {
  try {
    console.log(token, uid);
    const PhoneTokenRef = db
      .collection("usuarios")
      .doc(uid)
      .collection("phoneTokens");

    await PhoneTokenRef.add({
      phoneToken: token,
    });
    console.log("Exito");
  } catch (error) {
    console.log(error);
    console.log("Error");
  }
};

const saveReminders = async (doc) => {
  let phoneTokens = [];
  try {
    const {
      vacunaInfo,
      childId,
      userId,
      date,
      state,
      reminder,
      firstReminder,
      SecondReminder,
      thirdReminder,
      fourthReminder,
      child,
      user,
    } = doc;

    const refVaccines = db
      .collection("usuarios")
      .doc(userId)
      .collection("childUsers")
      .doc(childId)
      .collection("vacunas")
      .doc(vacunaInfo.id);

    await refVaccines.update({
      state,
      reminder,
      date,
    });

    const PhoneTokenRef = await db
      .collection("usuarios")
      .doc(userId)
      .collection("phoneTokens")
      .get();

    const remindersRef = db.collection("reminders");

    PhoneTokenRef.forEach((doc) => {
      phoneTokens.push({ ...doc.data() });
    });
    const ArrayRecordatorios = [
      firstReminder,
      SecondReminder,
      thirdReminder,
      fourthReminder,
    ];

    for (const [i, doc] of ArrayRecordatorios.entries()) {
      const { date } = doc;

      if (date !== null) {
        const reminder = {
          childId,
          userId,
          ...doc,
          child,
          user,
          vaccine: vacunaInfo.vaccine,
          phoneTokens,
          stateReminder: true,
          hoy: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        await remindersRef.doc(`remider-${i}-${vacunaInfo.id}`).set(reminder);
      } else {
        const reminder = {
          childId,
          userId,
          ...doc,
          child,
          user,
          vaccine: vacunaInfo.vaccine,
          phoneTokens,
          stateReminder: false,
          hoy: firebase.firestore.Timestamp.fromDate(new Date()),
        };
        await remindersRef.doc(`remider-${i}-${vacunaInfo.id}`).set(reminder);
      }
    }
  } catch (error) {
    console.log("Error", error);
  }
};

const saveRemindersNewborn = async (document) => {
  let phoneTokens = [];
  try {
    const {
      ArrayRecordatorios,
      childId,
      userId,
      child,
      user,
      vaccine,
      stateReminder,
      idVaccine,
      vaccinationDate,
    } = document;

    const PhoneTokenRef = await db
      .collection("usuarios")
      .doc(userId)
      .collection("phoneTokens")
      .get();

    const refVaccines = db
      .collection("usuarios")
      .doc(userId)
      .collection("childUsers")
      .doc(childId)
      .collection("vacunas")
      .doc(idVaccine);

    await refVaccines.update({
      date: vaccinationDate,
    });

    const remindersRef = db.collection("reminders");

    PhoneTokenRef.forEach((doc) => {
      phoneTokens.push({ ...doc.data() });
    });

    for (const [i, doc] of ArrayRecordatorios.entries()) {
      const reminder = {
        childId,
        userId,
        ...doc,
        child,
        user,
        vaccine,
        phoneTokens,
        stateReminder,
      };
      await remindersRef.doc(`remider-${i}-${idVaccine}`).set(reminder);
    }
  } catch (error) {
    console.log("Error", error);
  }
};

export { saveTokenPhone, saveReminders, saveRemindersNewborn };
