import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PropTypes from "prop-types";
import React from "react";
import "./index.scss";

Pagination.propTypes = {
	pagination: PropTypes.object.isRequired,
	onPageChange: PropTypes.func,
};

Pagination.defaultProps = {
	onPageChange: null,
};

function Pagination({ pagination, onPageChange }) {
	const { _page, _limit, _totalRows } = pagination;
	const totalPages = Math.ceil(_totalRows / _limit);

	const handleOnPageChange = (newPage) => {
		if (!onPageChange || newPage === _page) return;

		onPageChange(newPage);
	};

	const getPageList = (_page, _limit, _totalRows) => {
		const totalPages = Math.ceil(_totalRows / _limit);
		let prevPage = -1;

		if (_page < 1 || _page > totalPages) return [-1, -1, -1];

		if (_page === 1) prevPage = 1;
		else if (_page === totalPages) prevPage = _page - 2 > 0 ? _page - 2 : 1;
		else prevPage = _page - 1;

		const currPage = prevPage + 1 > totalPages ? -1 : prevPage + 1;
		const nextPage = prevPage + 2 > totalPages ? -1 : prevPage + 2;

		return [prevPage, currPage, nextPage];
	};

	const pageList = getPageList(_page, _limit, _totalRows);

	return (
		<ul className="pagination">
			{_page > 1 && (
				<li onClick={() => handleOnPageChange(_page - 1)}>
					<FontAwesomeIcon icon="long-arrow-alt-left" />
				</li>
			)}


			{totalPages > 1 &&
				pageList.map(
					(page, idx) =>
						page !== -1 && (
							<li
								key={idx}
								className={page === _page ? "is-active" : ""}
								onClick={() => handleOnPageChange(page)}
							>
								{page}
							</li>
						),
				)}

			{_page < totalPages && (
				<li onClick={() => handleOnPageChange(_page + 1)}>
					<FontAwesomeIcon icon="long-arrow-alt-right" />
				</li>
			)}
		</ul>
	);
}

export default Pagination;
