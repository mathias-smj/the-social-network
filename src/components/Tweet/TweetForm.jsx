import { AreaField } from '../AreaField/AreaField.jsx';
import InputField from '../ui/Input/InputField.jsx';
import { addTweet } from '../../api/models/tweets.js';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext/AuthContext.jsx';
import { useAuth } from '../../context/AuthContext/useAuth.js';
import { getTweetsByUserId} from '../../api/models/tweets.js';
import { toast } from 'sonner';

export const TweetForm = ({ avatar_url }) => {
  const [tweets, setTweets] = useState([]);
  const { user, isAuthentificated } = useAuth();
  const userId = user ? user.id : null;
  const [tweetContent, setTweetContent] = useState('')

  const updateTweetList = async () => {
    try {
      const tweetsData = await getTweetsByUserId(userId)
      setTweets(tweetsData)
    } catch (error) {
      throw error
    }
  }
  const handleSubmit = async (event) => {
    try {
      event.preventDefault()
      const form = event.target
      const formData = new FormData(form)
      const content = formData.get('content');
      const result = addTweet(content)
      updateTweetList()
      form.reset();

    } catch (error) {
      throw error
    }
  };

  return (
    <>
      <div className="container mx-auto pb-8">
        <div className="bg-white rounded-lg shadow-md">
          <div className="p-4">
            <h1 className="text-xl font-semibold flex flex-row justify-start items-center pl-2">Quoi de neuf {user.username} ?</h1>
          </div>
          <form onSubmit={handleSubmit} className="px-4 py-2">
            <AreaField id={'content'} name={'content'} rows={3} placeholder={'Que voulez-vous partager ?'} onChange={(e) => setTweetContent(e.target.value)} />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center">
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-lg">Tweet</button>
              </div>
              <div>
                <span className="text-gray-400">Limite de caractères 200</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
