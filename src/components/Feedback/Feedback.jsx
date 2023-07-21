import Statistics from '../Statistics';
import FeedbackOptions from '../FeedbackOptions';
import Section from '../Section';
import Notification from '../Notification';
import { useState } from 'react';

function Feedback() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const onLeaveFeedback = feedbackType => {
    switch (feedbackType) {
      case 'good':
        setGood(prevGood => prevGood + 1);
        break;

      case 'neutral':
        setNeutral(prevNeutral => prevNeutral + 1);
        break;

      case 'bad':
        setBad(prevBad => prevBad + 1);
        break;

      default:
        console.log('Unexpected feedbackType!');
    }
  };

  const totalFeedbackCount = good + neutral + bad;

  const countPositiveFeedbackPercentage = () => {
    if (totalFeedbackCount === 0) {
      return 0;
    }

    return Math.round((good * 100) / totalFeedbackCount);
  };

  return (
    <>
      <Section title={'Please leave feedback'}>
        <FeedbackOptions
          options={['good', 'neutral', 'bad']}
          onLeaveFeedback={onLeaveFeedback}
        />
      </Section>

      <Section title={'Statistics'}>
        {totalFeedbackCount !== 0 ? (
          <Statistics
            good={good}
            neutral={neutral}
            bad={bad}
            totalCount={totalFeedbackCount}
            positivePercentage={countPositiveFeedbackPercentage()}
          />
        ) : (
          <Notification message={'There is no feedback!'} />
        )}
      </Section>
    </>
  );
}

// class Feedback extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };

//   onLeaveFeedback = feedbackType => {
//     this.setState(prevState => ({
//       [feedbackType]: prevState[feedbackType] + 1,
//     }));
//     this.totalFeedbackCount();
//   };

//   totalFeedbackCount = () => {
//     const { good, neutral, bad } = this.state;
//     return good + neutral + bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//     const { good } = this.state;
//     const totalCount = this.totalFeedbackCount();

//     if (totalCount === 0) {
//       return 0;
//     }

//     return Math.round((good * 100) / totalCount);
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const optionssArr = Object.keys(this.state);
//     const totalCount = this.totalFeedbackCount();

//     return (
//       <>
//         <Section title={'Please leave feedback'}>
//           <FeedbackOptions
//             options={optionssArr}
//             onLeaveFeedback={this.onLeaveFeedback}
//           />
//         </Section>

//         <Section title={'Statistics'}>
//           {totalCount !== 0 ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               totalCount={this.totalFeedbackCount()}
//               positivePercentage={this.countPositiveFeedbackPercentage()}
//             />
//           ) : (
//             <Notification message={'There is no feedback!'} />
//           )}
//         </Section>
//       </>
//     );
//   }
// }

export default Feedback;
