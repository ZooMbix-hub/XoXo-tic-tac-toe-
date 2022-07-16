import React, { useEffect, useState } from 'react';
import PlayersHistory from '../../components/PlayersHistory';
import Loading from '../../components/loading/Loading';
import './HistoryStyle.scss';
import './HistoryAdaptive.scss';
import { getHistory } from '../../http/historyAPI';
import Pagination from '../../components/pagination/Pagination';


const History = () => {
	const [loading, setLoading] = useState(true);
	const [historyArr, setHistoryArr] = useState([]);
	const [page, setPage] = useState(1);
	const [totalCount, setTotalCount] = useState(0);
	const [limit, setLimit] = useState(6);

	useEffect(() => {
		getHistory(1, 6).then((data) => {
			setTotalCount(data.count)
			setHistoryArr(data.rows)
		}).finally(() => setLoading(false));
	}, []);

	useEffect(() => {
		getHistory(page, 6).then((data) => {
			setTotalCount(data.count)
			setHistoryArr(data.rows)
		}).finally(() => setLoading(false));
	}, [page])
	
	if (loading) {
		return <Loading />;
	}

	return (
		<div className='history'>
			<div className='container-history'>
					<div className='list-history'>
					<p className='title-block'>История игр</p>

						<ul className='players-history players-history-zero'>
							<li className='info-players-game'>Игроки</li>
							<li className='date-game'>Дата</li>
							<li className='time-game'>Время игры</li>
						</ul>
						{<div className="list-history-players">
							{historyArr.map((stories, i) => (
							<PlayersHistory key={i} stories={stories}/>
							))}
						</div>}
					</div>
				<Pagination totalCount={totalCount} limit={limit} page={page} setPage={setPage}/>
			</div>
		</div>
	)
}

export default History