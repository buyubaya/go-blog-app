import React from "react";
import {
	Button,
} from "tabler-react";


const Pagination = ({ page = 1, pageSize = 20, count = 0, onPageChange }) => {

	if (!page || !pageSize || !count) {
		return null;
	}

	const pageCount = Math.ceil(count/pageSize);

	if (!pageCount) {
		return null;
	}

	const _toPage = (newPage) => () => {
		if (newPage === page) {
			return false;
		}

		if (onPageChange) {
			onPageChange(newPage);
		}
	};


	if (pageCount < 2) {
		return null;
	}


	return(
		<div className="pagination">
			{
				Array(pageCount).fill(null).map((_, index) => 
					<Button
						key={index}
						onClick={_toPage(index + 1)}
						outline={index + 1 !== page}
						size="sm"
						color="secondary"
					>
						{index + 1}
					</Button>
				)
			}

			<style>
				{`
					.pagination {
						margin: 20px auto;
						display: flex;
            justify-content: center;
          }
          
          .pagination > .btn {
            margin: 0 5px;
          }
				`}
			</style>
		</div>
	)   
}


export default Pagination;