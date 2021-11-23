export default function addSubscription(req, res, db) {
  const { email, subscription, state } = req.body;

  if (!email) {
    return res.status(400).json("Email error");
  }

  if (
    !subscription &&
    (subscription !== "newsletter" || subscription !== "other_subscription")
  ) {
    return res.status(400).json("Subscription not defined");
  }

  if (state) {
    db("subscriptions")
      .insert({
        email: email,
        newsletter: state,
        date_added: Date.now(),
      })
      .returning("*")
      .then((response) => {
        return res.json(response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  } else {
    db("subscriptions")
      .where({
        email: email,
      })
      .del()
      .then((response) => {
        return res.json(!!response);
      })
      .catch((err) => {
        return res.status(400).json(err);
      });
  }
}
  